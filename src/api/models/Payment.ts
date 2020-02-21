import { IsNotEmpty } from 'class-validator'
import { Column, Entity } from 'typeorm'
import { BaseModel } from './BaseModel'

@Entity()
export class ProductUnit extends BaseModel {

  @IsNotEmpty()
  @Column()
  public amount: number

  @IsNotEmpty()
  @Column()
  public status: string
}
