// import { QueryRunner, TableIndex } from 'typeorm'
// import { BaseCreateTable } from '../BaseCreateTable'
//
// export class User1553879949523 extends BaseCreateTable {
//   protected tableName = 'user'
//
//   public async up(queryRunner: QueryRunner): Promise<any> {
//     const table = this.initTable([{
//       name: 'email',
//       type: 'varchar',
//       length: '255',
//       isNullable: true,
//     }, {
//       name: 'phone',
//       type: 'varchar',
//       length: '15',
//       isNullable: true,
//     }, {
//       name: 'first_name',
//       type: 'varchar',
//       length: '255',
//       isNullable: true,
//     }, {
//       name: 'uid',
//       type: 'varchar',
//       length: '28',
//       isNullable: true,
//     }])
//
//     const emailIndex = new TableIndex({
//       columnNames: ['email'],
//       isUnique: true,
//     })
//
//     const phoneIndex = new TableIndex({
//       columnNames: ['phone'],
//       isUnique: true,
//     })
//
//     const resetPasswordTokenIndex = new TableIndex({
//       columnNames: ['uid'],
//       isUnique: true,
//     })
//
//     await queryRunner.createTable(table)
//     await queryRunner.createIndex(table, emailIndex)
//     await queryRunner.createIndex(table, phoneIndex)
//     await queryRunner.createIndex(table, resetPasswordTokenIndex)
//   }
// }
