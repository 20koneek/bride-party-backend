import { Field, GraphQLTimestamp, ID, Int, ObjectType } from 'type-graphql'
import { IsNotEmpty } from 'class-validator'
import { Moment } from 'moment'
import { Column } from 'typeorm'

@ObjectType({
  description: 'Check object.',
})
export class Check {
  @Field(() => ID)
  public id: string

  @Field({
    description: 't params.',
    nullable: true,
  })
  public name: string

  @Field(() => Int, {
    description: 't params.',
  })
  public totalSum: number

  @Column()
  @IsNotEmpty()
  public status: string

  @Field(() => GraphQLTimestamp, {
    description: 't params.',
  })
  public dateTime: Moment
}
