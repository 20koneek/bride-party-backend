import { Service } from 'typedi'
import { Color } from '../models'
import { ColorInput, ColorStatus } from '../types'

@Service()
export class ColorService {

    public all = (): Promise<Color[]> => (
        Color.findAll({ where: { status: ColorStatus.Active } })
    )

    public find = ({ id }: { id: string }): Promise<Color> => (
        Color.findOne({ where: { id } })
    )

    public create = ({ input }: { input: ColorInput }): Promise<Color> => (
        Color.create(input)
    )

    public update = async ({ id, input }: { id: string, input: ColorInput }): Promise<Color> => {
        const [, [color]] = await Color.update(input, { where: { id } })

        return color
    }

    public delete = async ({ id }: { id: string }): Promise<boolean> => {
        const [color] = await Color.update(
            { status: ColorStatus.Deleted },
            { where: { id } },
        )

        return !!color
    }
}
