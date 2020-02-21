import { Dictionary } from '../../types/global'
import fetch, { RequestInit } from 'node-fetch'
import { TheMapTypes } from './types'

export class TheMap {
    private headers: Dictionary<string> = { 'Content-Type': 'application/x-www-form-urlencoded' }

    constructor(
        private domain: string,
        private key: string,
        private password: string,
    ) {
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

    public init = async ({
        orderId,
        amount,
        addCard,
        type,
        paymentType,
        recurrent,
        lifetime,
        cardUId,
        userLogin,
        userPassword,
    }: TheMapTypes.Init.Params): Promise<TheMapTypes.CreateUser.Response> => {
        const createParams: URLSearchParams = new URLSearchParams()
        createParams.set('Key', this.key)
        createParams.set('Password', this.password)
        createParams.set('CustomParams', 'successUrl=https://mapcard.pro;failUrl=https://mapisacard.com;Email=user@example.com;PayButtonCustomText=Оформить подписку за 1 руб.')
        orderId && createParams.set('OrderId', orderId)
        amount && createParams.set('Amount', amount.toString())
        addCard && createParams.set('AddCard', addCard.toString())
        type && createParams.set('Type', type)
        paymentType && createParams.set('PaymentType', paymentType)
        recurrent && createParams.set('Recurrent', recurrent.toString())
        lifetime && createParams.set('Lifetime', lifetime.toString())
        cardUId && createParams.set('CardUId', cardUId)
        userLogin && createParams.set('UserLogin', userLogin)
        userPassword && createParams.set('UserPassword', userPassword)

        return await this.fetchQuery('init', createParams)
    }
    public createUser = async (login: string, password: string): Promise<TheMapTypes.CreateUser.Response> => {
        const createParams: URLSearchParams = new URLSearchParams()
        createParams.set('Key', this.key)
        createParams.set('Login', login)
        createParams.set('Password', password)

        return await this.fetchQuery('createUser', createParams)
    }
}
