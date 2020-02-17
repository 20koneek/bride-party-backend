// import { IsNotEmpty } from 'class-validator'
// import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
//
// import { BaseModel } from './BaseModel'
// import { Region } from './Region'
//
// @Entity()
// export class City extends BaseModel {
//
//   @IsNotEmpty()
//   @Column()
//   public name: string
//
//   @IsNotEmpty()
//   @Column({ name: 'region_id' })
//   public regionId: string
//
//   @IsNotEmpty()
//   @JoinColumn({ name: 'region_id' })
//   @ManyToOne(() => Region, region => region.cities, {
//     lazy: true,
//   })
//   public region: Region
// }
