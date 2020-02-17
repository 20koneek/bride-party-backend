import { IsNotEmpty } from 'class-validator'
import { Column, Entity, OneToOne } from 'typeorm'
import { BaseModel } from './BaseModel'
import { Check } from './Check'
import { CheckParam } from './CheckParam'

@Entity()
export class CheckResponse extends BaseModel {

  @Column()
  @IsNotEmpty()
  public response: string

  @IsNotEmpty()
  @Column({ name: 'check_param_id' })
  public checkParamId: string

  @IsNotEmpty()
  @OneToOne(() => CheckParam, ({ checkResponse }) => checkResponse, {
    lazy: true,
  })
  public checkParam: Check
}
