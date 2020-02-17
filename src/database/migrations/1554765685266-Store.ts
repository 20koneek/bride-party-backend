import { QueryRunner, TableIndex } from 'typeorm'
import { BaseCreateTable } from '../BaseCreateTable'

export class Store1554765685266 extends BaseCreateTable {
  protected tableName = 'store'

  public async up(queryRunner: QueryRunner): Promise<any> {
    const table = this.initTable([{
      name: 'address',
      type: 'varchar',
      length: '255',
      isNullable: true,
    }, {
      name: 'retailer_id',
      type: 'uuid',
    }], [{
      columnNames: ['retailer_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'retailer',
    }])

    const tableIndex = new TableIndex({
      columnNames: ['address'],
    })

    await queryRunner.createTable(table)
    await queryRunner.createIndex(table, tableIndex)
  }
}
