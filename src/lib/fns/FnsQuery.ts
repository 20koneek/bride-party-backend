import moment from 'moment'
import fetch, { Response } from 'node-fetch'
import { Check, CheckParam, CheckProduct, CheckResponse, Retailer, Store } from '../../api/models'

import { FnsCheck, FnsResponse } from '../../types/FnsTypes'

export class FnsQuery {

  public static async fetchCheckParam(checkParam: CheckParam): Promise<boolean> {
    const { fn, n, i, s, t, fp } = checkParam
    const url = new URL(`ofds/*/inns/*/fss/${fn}/operations/${n}/tickets/${i}`, this.baseUrl)
    const params = new URLSearchParams({
      sum: s,
      date: t,
      fiscalSign: fp,
    })
    const { status } = await fetch(`${url}?${params}`, { headers: this.headers })

    const validStatus = status === 204

    if (validStatus) {
      await this.getScanCheckJson(checkParam)
    }

    return validStatus
  }

  public static async getScanCheck(checkParam: CheckParam): Promise<Check | undefined> {
    const response = await this.getScanCheckJson(checkParam)
    const json = await response.json()
    const { document: { receipt } }: FnsResponse = json

    await this.createCheckResponse(checkParam.id, json)

    return await this.updateCheck(checkParam.checkId, receipt)
  }

  private static headers = {
    'Device-Id': 'noneOrRealId',
    'Device-OS': 'Adnroid 5.1',
    'Authorization': 'Basic Kzc5MTA2ODMzNTEwOjU1MTc5MQ==',
  }

  private static baseUrl = 'https://proverkacheka.nalog.ru:9999/v1/'

  private static async createCheckResponse(checkParamId: string, response: JSON): Promise<CheckResponse> {
    const checkResponse = new CheckResponse()
    checkResponse.checkParamId = checkParamId
    checkResponse.response = JSON.stringify(response)

    return checkResponse.save()
  }

  private static async getScanCheckJson({ id, fn, i, fp }: CheckParam): Promise<Response> {
    const url = new URL(`inns/*/kkts/*/fss/${fn}/tickets/${i}`, this.baseUrl)
    const params = new URLSearchParams({
      fiscalSign: fp,
      sendToEmail: 'no',
    })
    await fetch(`${url}?${params}`, { headers: this.headers })

    return await fetch(`${url}?${params}`, { headers: this.headers })
  }

  private static async getRetailer(receipt: FnsCheck): Promise<Retailer> {
    let retailer = await Retailer.findOne({ inn: receipt.userInn })

    if (!retailer) {
      retailer = new Retailer()
      retailer.inn = receipt.userInn
      retailer.name = (receipt.user || receipt.userInn).trim()
      await retailer.save()
    }

    return retailer
  }

  private static async getStore(retailerId: string, receipt: FnsCheck): Promise<Store> {

    let store = await Store.findOne({ retailerId, address: receipt.retailPlaceAddress })

    if (!store) {
      store = new Store()
      store.address = receipt.retailPlaceAddress
      store.retailerId = retailerId
      await store.save()
    }

    return store
  }

  private static createCheckProducts = ({ items }: FnsCheck): CheckProduct[] => (
    items.map(({ name, price, quantity, sum }) => {
      const checkProduct = new CheckProduct()
      checkProduct.name = name
      checkProduct.price = price
      checkProduct.quantity = quantity
      checkProduct.sum = sum

      return checkProduct
    })
  )

  private static async updateCheck(checkId: string, receipt: FnsCheck): Promise<Check | undefined> {
    const retailer = await this.getRetailer(receipt)
    const store = await this.getStore(retailer.id, receipt)
    const check = await Check.findOne(checkId)

    if (check) {
      check.name = receipt.user?.trim()
      check.dateTime = moment(receipt.dateTime)
      check.totalSum = receipt.totalSum
      check.checkProducts = this.createCheckProducts(receipt)
      check.retailerId = retailer.id

      if (store) {
        check.storeId = store.id
      }

      await check.save()
    }

    return check
  }
}
