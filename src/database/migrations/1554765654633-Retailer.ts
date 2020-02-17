import { QueryRunner, TableIndex } from 'typeorm'
import { BaseCreateTable } from '../BaseCreateTable'

export class Retailer1554765654633 extends BaseCreateTable {
  protected tableName = 'retailer'

  public async up(queryRunner: QueryRunner): Promise<any> {
    const table = this.initTable([{
      name: 'inn',
      type: 'varchar',
      length: '12',
      isNullable: true,
    }, {
      name: 'name',
      type: 'varchar',
      length: '255',
      isNullable: true,
    }])

    const tableIndex = new TableIndex({
      columnNames: ['inn'],
      isUnique: true,
    })

    await queryRunner.createTable(table)
    await queryRunner.createIndex(table, tableIndex)
  }
}
