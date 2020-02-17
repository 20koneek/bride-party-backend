import { IsNotEmpty, Length, MaxLength } from 'class-validator'
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm'
import { BaseModel } from './BaseModel'
import { Check } from './Check'
import { CheckResponse } from './CheckResponse'

@Entity()
export class CheckParam extends BaseModel {

  @Column()
  @IsNotEmpty()
  @MaxLength(20)
  public t: string

  @Column()
  @IsNotEmpty()
  @MaxLength(20)
  public s: string

  @Column()
  @IsNotEmpty()
  @MaxLength(20)
  public fn: string

  @Column()
  @IsNotEmpty()
  @MaxLength(20)
  public i: string

  @Column()
  @IsNotEmpty()
  @MaxLength(20)
  public fp: string

  @Column()
  @IsNotEmpty()
  @Length(1, 1)
  public n: string

  @IsNotEmpty()
  @Column({ name: 'check_id' })
  public checkId: string

  @JoinColumn({ name: 'check_id' })
  @OneToOne(() => Check, ({ checkParam }) => checkParam, {
    lazy: true,
  })
  public check: Check

  @IsNotEmpty()
  @OneToOne(() => CheckResponse, ({ checkParam }) => checkParam, {
    lazy: true,
  })
  public checkResponse: CheckResponse
}
