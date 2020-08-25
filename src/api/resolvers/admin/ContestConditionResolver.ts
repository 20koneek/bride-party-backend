import { Service } from 'typedi'
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql'
import { ContestCondition, ContestConditionInput } from '../../types'
import { ContextWithRequired } from '../../../types/Context'
import { CurrentUidMiddleware } from '../middlewares'
import { ContestConditionService } from '../../services'

@Service()
@Resolver()
export class ContestResolver {

    constructor(
        private service: ContestConditionService,
    ) {
    }

    @Mutation(() => ContestCondition)
    @UseMiddleware(CurrentUidMiddleware)
    public async contestConditionCreate(
        @Ctx() { uid }: ContextWithRequired,
        @Arg('input') input: ContestConditionInput,
    ): Promise<ContestCondition> {
        return this.service.create({ input })
    }
}
