import { Column, Model, DataType, PrimaryKey, Default } from 'sequelize-typescript'

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
})

export class BaseModel<T> extends Model<T> {

    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(UUIDColumn)
    public id: string
}
