import { Column, Model, DataType, PrimaryKey, Default } from 'sequelize-typescript'

export const UUIDColumn = {
    allowNull: false,
    type: DataType.UUID,
}

export class BaseModel<T> extends Model<T> {

    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(UUIDColumn)
    public id: string
}
