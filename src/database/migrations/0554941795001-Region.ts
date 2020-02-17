// import { QueryRunner, TableIndex } from 'typeorm'
// import { BaseCreateTable } from '../BaseCreateTable'
//
// export class Region1554941795001 extends BaseCreateTable {
//   protected tableName = 'region'
//
//   public async up(queryRunner: QueryRunner): Promise<any> {
//     const table = this.initTable([{
//       name: 'name',
//       type: 'varchar',
//       length: '150',
//     }])
//
//     const nameIndex = new TableIndex({
//       columnNames: ['name'],
//     })
//
//     await queryRunner.createTable(table)
//     await queryRunner.createIndex(table, nameIndex)
//   }
// }
