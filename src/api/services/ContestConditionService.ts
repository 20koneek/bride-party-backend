import { Service } from 'typedi'
import { Color, ContestCondition } from '../models'
import { ContestConditionInput } from '../types'

@Service()
export class ContestConditionService {

    public find = async ({ id }: { id: string }): Promise<ContestCondition> => {
        const condition = await ContestCondition.findOne({
            where: { id },
            include: [Color],
        })

        if (!condition) {
            throw new Error('NotFound')
        }

        return condition
    }

    public create = async ({ input }: { input: ContestConditionInput }): Promise<ContestCondition> => {
        const condition = await ContestCondition.create(input)
        const color = await condition.$get('color')

        if (color) {
            condition.color = color
        }

        return condition
    }

    public update = async ({ id, input }: { id: string, input: ContestConditionInput }): Promise<ContestCondition> => {
        const condition = await ContestCondition.findOne({ where: { id } })

        if (!condition) {
            throw new Error('NotFound')
        }

        condition.name = input.name
        condition.colorId = input.colorId
        await condition.save()

        const color = await condition.$get('color')

        if (color) {
            condition.color = color
        }

        return condition
    }
}
