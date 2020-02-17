import { QueryRunner, TableIndex } from 'typeorm'

import { BaseCreateTable } from '../BaseCreateTable'

export class CreateProductCheckInfo1555619589567 extends BaseCreateTable {
  protected tableName = 'product_check_info'

  public async up(queryRunner: QueryRunner): Promise<any> {
    const table = this.initTable([{
      name: 'price',
      type: 'integer',
    }, {
      name: 'gross_price',
      type: 'integer',
    }, {
      name: 'check_product_id',
      type: 'uuid',
    }, {
      name: 'product_id',
      type: 'uuid',
    }, {
      name: 'product_mapping_id',
      type: 'uuid',
    }], [{
      columnNames: ['product_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'product',
    }, {
      columnNames: ['check_product_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'check_product',
    }, {
      columnNames: ['product_mapping_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'product_mapping',
    }])

    const tableIndex = new TableIndex({
      columnNames: ['check_product_id'],
      isUnique: true,
    })

    await queryRunner.createTable(table)
    await queryRunner.createIndex(table, tableIndex)
  }
}
