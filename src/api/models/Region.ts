// import { IsNotEmpty } from 'class-validator'
// import { Column, Entity, OneToMany } from 'typeorm'
//
// import { BaseModel } from './BaseModel'
// import { City } from './City'
//
// @Entity()
// export class Region extends BaseModel {
//
//   @IsNotEmpty()
//   @Column()
//   public name: string
//
//   @OneToMany(() => City, city => city.region, {
//     lazy: true,
//     cascade: true,
//   })
//   public cities: City[]
// }
