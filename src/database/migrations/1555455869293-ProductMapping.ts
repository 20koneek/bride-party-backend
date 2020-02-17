import { QueryRunner, TableIndex } from 'typeorm'
import { BaseCreateTable } from '../BaseCreateTable'

export class ProductMapping1555455869293 extends BaseCreateTable {
  protected tableName = 'product_mapping'

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
      name: 'retailer_id',
      type: 'uuid',
    }, {
      name: 'product_id',
      type: 'uuid',
    }], [{
      columnNames: ['product_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'product',
    }, {
      columnNames: ['retailer_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'retailer',
    }])

    const nameIndex = new TableIndex({
      columnNames: ['name'],
    })

    const nameStatusIndex = new TableIndex({
      columnNames: ['name', 'status'],
    })

    const findIndex = new TableIndex({
      columnNames: ['name', 'retailer_id'],
      isUnique: true,
    })

    const findStatusIndex = new TableIndex({
      columnNames: ['name', 'retailer_id', 'status'],
    })

    await queryRunner.createTable(table)
    await queryRunner.createIndex(table, nameIndex)
    await queryRunner.createIndex(table, nameStatusIndex)
    await queryRunner.createIndex(table, findIndex)
    await queryRunner.createIndex(table, findStatusIndex)
  }
}
