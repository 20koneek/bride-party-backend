import { QueryRunner, TableIndex } from 'typeorm'
import { BaseCreateTable } from '../BaseCreateTable'

export class Product1554941795004 extends BaseCreateTable {
  protected tableName = 'product'

  public async up(queryRunner: QueryRunner): Promise<any> {
    const table = this.initTable([{
      name: 'name',
      type: 'varchar',
      length: '255',
    }, {
      name: 'product_unit_id',
      type: 'uuid',
    }, {
      name: 'net_weight',
      type: 'double precision',
      default: 1,
    }], [{
      columnNames: ['product_unit_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'product_unit',
    }])

    const tableIndex = new TableIndex({
      columnNames: ['name'],
    })

    await queryRunner.createTable(table)
    await queryRunner.createIndex(table, tableIndex)
  }
}
