import { Service } from 'typedi'
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql'
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

    @Query(() => ContestCondition)
    @UseMiddleware(CurrentUidMiddleware)
    public contestCondition(
        @Arg('id') id: string,
    ): Promise<ContestCondition> {
        return this.service.find({ id })
    }

    @Mutation(() => ContestCondition)
    @UseMiddleware(CurrentUidMiddleware)
    public async contestConditionCreate(
        @Ctx() { uid }: ContextWithRequired,
        @Arg('input') input: ContestConditionInput,
    ): Promise<ContestCondition> {
        return this.service.create({ input })
    }

    @Mutation(() => ContestCondition)
    @UseMiddleware(CurrentUidMiddleware)
    public async contestConditionUpdate(
        @Ctx() { uid }: ContextWithRequired,
        @Arg('id') id: string,
        @Arg('input') input: ContestConditionInput,
    ): Promise<ContestCondition> {
        return this.service.update({ id, input })
    }
}
