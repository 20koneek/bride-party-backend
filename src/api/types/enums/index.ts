import { registerEnumType } from 'type-graphql'

export enum Status {
    Init = 'Init',
    Run = 'Run',
    Failed = 'Failed',
    Finished = 'Finished',
}

registerEnumType(Status, {
    name: 'Status',
})

export enum CardStatus {
    NotSet = 'NotSet',
    Added = 'Added',
    Skipped = 'Skipped',
}

registerEnumType(CardStatus, {
    name: 'CardStatus',
})
