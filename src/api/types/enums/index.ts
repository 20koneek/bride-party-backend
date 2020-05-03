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
    Init = 'Init',
    Skipped = 'Skipped',
    Confirmed = 'Confirmed',
    Failed = 'Failed',
}

registerEnumType(CardStatus, {
    name: 'CardStatus',
})

// export const SearchResultUnion = createUnionType({
//     name: 'SearchResult', // the name of the GraphQL union
//     types: () => [Movie, Actor], // function that returns array of object types classes
// })
