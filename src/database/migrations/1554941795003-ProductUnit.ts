import { QueryRunner, TableIndex } from 'typeorm'
import { BaseCreateTable } from '../BaseCreateTable'

export class ProductUnit1554941795003 extends BaseCreateTable {
  protected tableName = 'product_unit'

  public async up(queryRunner: QueryRunner): Promise<any> {
    const table = this.initTable([{
      name: 'name',
      type: 'varchar',
      length: '255',
    }, {
      name: 'status',
      type: 'varchar',
      length: '10',
      default: '\'init\'',
    }, {
      name: 'parent_product_unit_id',
      type: 'uuid',
      isNullable: true,
    }], [{
      columnNames: ['parent_product_unit_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'product_unit',
    }])

    const nameIndex = new TableIndex({
      columnNames: ['name'],
    })

    const statusIndex = new TableIndex({
      columnNames: ['status'],
    })

    const tableIndex = new TableIndex({
      columnNames: ['name', 'status'],
    })

    await queryRunner.createTable(table)
    await queryRunner.createIndex(table, nameIndex)
    await queryRunner.createIndex(table, statusIndex)
    await queryRunner.createIndex(table, tableIndex)
  }
}
