import { Column, Model, DataType, PrimaryKey, Default, createIndexDecorator } from 'sequelize-typescript'

export const UUIDColumn = {
    allowNull: false,
    type: DataType.UUID,
}

export const ENUMDataType = (ENUM) => (
    DataType.ENUM({ values: Object.keys(ENUM) })
)

export const Paymentable = ({ name }: Function) => ({
    scope: { paymentableType: name },
    foreignKey: 'paymentableId',
    constraints: false,
})

export const Attachmentable = ({ name }: Function) => ({
    scope: { attachmentableType: name },
    foreignKey: 'attachmentableId',
    constraints: false,
})

export const GroupIndex = createIndexDecorator({ type: 'FULLTEXT' })

export class BaseModel<T> extends Model<T> {

    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(UUIDColumn)
    public id: string
}
