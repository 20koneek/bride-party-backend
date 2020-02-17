import { IsNotEmpty, Length, MaxLength } from 'class-validator'
import { Field, InputType } from 'type-graphql'

@InputType()
export class CheckInput {

  @IsNotEmpty()
  @MaxLength(20)
  @Field({
    description: 't params.',
  })
  public t: string

  @IsNotEmpty()
  @MaxLength(20)

  @Field({
    description: 't params.',
  })
  public s: string

  @IsNotEmpty()
  @MaxLength(20)
  @Field({
    description: 't params.',
  })
  public fn: string

  @IsNotEmpty()
  @MaxLength(20)
  @Field({
    description: 't params.',
  })
  public i: string

  @IsNotEmpty()
  @MaxLength(20)
  @Field({
    description: 't params.',
  })
  public fp: string

  @IsNotEmpty()
  @Length(1, 1)
  @Field({
    description: 't params.',
  })
  public n: string
}
