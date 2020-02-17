import { IsNotEmpty } from 'class-validator'
import { Moment } from 'moment'
import { BaseEntity, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export abstract class BaseModel extends BaseEntity {

  @PrimaryColumn('uuid', { default: () => 'uuid_generate_v4()' })
  public id: string

  @IsNotEmpty()
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'LOCALTIMESTAMP',
  })
  public createdAt: Moment

  @IsNotEmpty()
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'LOCALTIMESTAMP',
  })
  public updatedAt: Moment
}
