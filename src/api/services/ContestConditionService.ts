import { Service } from 'typedi'
import { ContestCondition } from '../models'
import { ContestConditionInput } from '../types'

@Service()
export class ContestConditionService {

    public create = async ({ input }: { input: ContestConditionInput }): Promise<ContestCondition> => {
        const condition = await ContestCondition.create(input)
        const color = await condition.$get('color')

        if (color) {
            condition.color = color
        }

        return condition
    }
}
