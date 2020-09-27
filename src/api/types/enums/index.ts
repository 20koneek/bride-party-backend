import { registerEnumType } from 'type-graphql'

export enum PaymentStatus {
    Init = 'Init',
    Run = 'Run',
    Failed = 'Failed',
    Finished = 'Finished',
}

registerEnumType(PaymentStatus, { name: 'PaymentStatus' })


export enum CardStatus {
    Init = 'Init',
    Skipped = 'Skipped',
    Confirmed = 'Confirmed',
    Failed = 'Failed',
}

registerEnumType(CardStatus, { name: 'CardStatus' })


export enum Role {
    Admin = 'Admin',
    User = 'User',
}

registerEnumType(Role, { name: 'Role' })
