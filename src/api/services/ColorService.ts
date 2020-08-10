import { Service } from 'typedi'
import { Color } from '../models'
import { ColorInput } from '../types'

@Service()
export class ColorService {

    public all = (): Promise<Color[]> => (
        Color.findAll()
    )

    public find = ({ id }: { id: string }): Promise<Color> => (
        Color.findOne({ where: { id } })
    )

    public create = ({ input }: { input: ColorInput }): Promise<Color> => (
        Color.create(input)
    )

    public update = async ({ id, input }: { id: string, input: ColorInput }): Promise<Color> => {
        const [, [contest]] = await Color.update(input, { where: { id } })

        return contest
    }
}
