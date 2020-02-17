import { IsNotEmpty, MaxLength } from 'class-validator'
import { Column, Entity, Index, OneToMany } from 'typeorm'
import { BaseModel } from './BaseModel'
import { Store } from './Store'
import { Check } from './Check'
import { ProductMapping } from './ProductMapping'

@Entity()
@Index(['inn'], { unique: true })
export class Retailer extends BaseModel {

  @Column()
  @IsNotEmpty()
  public name: string

  @Column()
  @IsNotEmpty()
  @MaxLength(12)
  public inn: string

  @OneToMany(() => Store, ({ retailer }) => retailer, {
    lazy: true,
  })
  public stores: Store[]

  @IsNotEmpty()
  @OneToMany(() => Check, ({ retailer }) => retailer)
  public checks: Check[]

  @OneToMany(() => ProductMapping, ({ retailer }) => retailer)
  public productMappings: ProductMapping[]
}
