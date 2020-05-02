import { Dictionary } from '../../types/global'
import fetch, { RequestInit } from 'node-fetch'
import { TheMapTypes } from './types'

export class TheMap {
    private headers: Dictionary<string> = { 'Content-Type': 'application/x-www-form-urlencoded' }

    constructor(
        private domain: string,
        private key: string,
        private password: string,
        private hostUrl: string,
    ) {
    }

    private getCustomParam = ({ successUrl, failUrl }: { successUrl: string, failUrl: string }): string => {
        const param = {
            successUrl: `${this.hostUrl}/${successUrl}`,
            failUrl: `${this.hostUrl}/${failUrl}`,
        }

        return Object.keys(param).map((key) => `${key}=${param[key]}`).join(';')
    }

    private getUrl = (url: string): URL => (
        new URL(url, `https://${this.domain}`)
    )

    private fetchQuery = async <T>(url: string, body: BodyInit): Promise<T> => {
        const init: RequestInit = {
            headers: this.headers,
            method: 'POST',
            body: body as string,
        }
        const response = await fetch(this.getUrl(url), init)

        return await response.json()
    }

    private init = async ({
                              orderId,
                              amount,
                              addCard,
                              type,
                              paymentType,
                              recurrent,
                              lifetime,
                              cardUid,
                              userLogin,
                              userPassword,
                              successUrl,
                              failUrl,
                          }: TheMapTypes.Init.Params): Promise<TheMapTypes.Init.Response> => {
        const createParams: URLSearchParams = new URLSearchParams()
        createParams.set('Key', this.key)
        createParams.set('Password', this.password)
        createParams.set('CustomParams', this.getCustomParam({ successUrl, failUrl }))
        orderId && createParams.set('OrderId', orderId)
        amount && createParams.set('Amount', amount.toString())
        addCard && createParams.set('AddCard', addCard.toString())
        type && createParams.set('Type', type)
        paymentType && createParams.set('PaymentType', paymentType)
        recurrent && createParams.set('Recurrent', recurrent.toString())
        lifetime && createParams.set('Lifetime', lifetime.toString())
        cardUid && createParams.set('CardUId', cardUid)
        userLogin && createParams.set('UserLogin', userLogin)
        userPassword && createParams.set('UserPassword', userPassword)

        return await this.fetchQuery('init', createParams)
    }

    public listCard = async ({
                                 login,
                                 password,
                             }: TheMapTypes.ListCard.Params): Promise<TheMapTypes.ListCard.Response> => {
        const createParams: URLSearchParams = new URLSearchParams()
        createParams.set('Key', this.key)
        createParams.set('Login', login)
        createParams.set('Password', password)

        return await this.fetchQuery('listCard', createParams)
    }

    private createPayment = ({ SessionGUID }: TheMapTypes.CreateCard.Params): string => {
        const createParams = new URLSearchParams()
        createParams.set('SessionId', SessionGUID)

        return `${this.getUrl('createPayment')}?${createParams}`
    }

    public createUser = async ({ login, password }: TheMapTypes.CreateUser.Params): Promise<TheMapTypes.CreateUser.Response> => {
        const createParams: URLSearchParams = new URLSearchParams()
        createParams.set('Key', this.key)
        createParams.set('Login', login)
        createParams.set('Password', password)

        return await this.fetchQuery('createUser', createParams)
    }

    public addCard = async ({ amount, failUrl, orderId, successUrl, userLogin, userPassword }: TheMapTypes.CreatePayment.Params): Promise<string> => {
        const { SessionGUID } = await this.init({
            type: 'Add',
            addCard: true,
            recurrent: true,
            orderId,
            amount,
            userLogin,
            userPassword,
            successUrl,
            failUrl,
        })

        return this.createPayment({ SessionGUID })
    }

    public pay = async ({ amount, failUrl, orderId, successUrl, userLogin, userPassword, cardUid }: TheMapTypes.CreatePayment.Params): Promise<string> => {
        const { SessionGUID } = await this.init({
            type: 'Pay',
            orderId,
            amount,
            userLogin,
            userPassword,
            successUrl,
            failUrl,
            cardUid,
        })

        if (!SessionGUID) {
            throw new Error('Can`t Pay')
        }

        return this.createPayment({ SessionGUID })
    }
}
