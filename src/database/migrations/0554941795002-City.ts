// import { QueryRunner, TableIndex } from 'typeorm'
// import { BaseCreateTable } from '../BaseCreateTable'
//
// export class City1554941795002 extends BaseCreateTable {
//   protected tableName = 'city'
//
//   public async up(queryRunner: QueryRunner): Promise<any> {
//     const table = this.initTable([{
//       name: 'name',
//       type: 'varchar',
//       length: '150',
//     }, {
//       name: 'region_id',
//       type: 'uuid',
//     }], [{
//       columnNames: ['region_id'],
//       referencedColumnNames: ['id'],
//       referencedTableName: 'region',
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
