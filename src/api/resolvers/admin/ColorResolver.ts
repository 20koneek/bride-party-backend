import { Arg, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql'
import { Service } from 'typedi'
import { Color, ColorInput } from '../../types'
import { CurrentUidMiddleware } from '../middlewares'
import { ColorService } from '../../services'

@Service()
@Resolver()
export class ColorResolver {

    constructor(
        private service: ColorService,
    ) {
    }

    @Query(() => [Color])
    @UseMiddleware(CurrentUidMiddleware)
    public colors(): Promise<Color[]> {
        return this.service.all()
    }

    @Query(() => Color)
    @UseMiddleware(CurrentUidMiddleware)
    public color(
        @Arg('id') id: string,
    ): Promise<Color> {
        return this.service.find({ id })
    }

    @Mutation(() => Color)
    @UseMiddleware(CurrentUidMiddleware)
    public async colorCreate(
        @Arg('input') input: ColorInput,
    ): Promise<Color> {
        return this.service.create({ input })
    }

    @Mutation(() => Color)
    @UseMiddleware(CurrentUidMiddleware)
    public async colorUpdate(
        @Arg('id') id: string,
        @Arg('input') input: ColorInput,
    ): Promise<Color> {
        return this.service.update({ id, input })
    }

    @Mutation(() => Boolean)
    @UseMiddleware(CurrentUidMiddleware)
    public async colorDelete(
        @Arg('id') id: string,
    ): Promise<boolean> {
        return this.service.delete({ id })
    }
}
