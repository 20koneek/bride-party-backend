import { registerEnumType } from 'type-graphql'

export enum PaymentStatus {
    Init = 'Init',
    Run = 'Run',
    Failed = 'Failed',
    Finished = 'Finished',
}

registerEnumType(PaymentStatus, {
    name: 'PaymentStatus',
})

export enum CardStatus {
    NotSet = 'NotSet',
    Confirmed = 'Confirmed',
    Failed = 'Failed',
    Skipped = 'Skipped',
}

registerEnumType(CardStatus, {
    name: 'CardStatus',
})
