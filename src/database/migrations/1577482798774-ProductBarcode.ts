import { QueryRunner, TableIndex } from 'typeorm'
import { BaseCreateTable } from '../BaseCreateTable'

export class ProductBarcode1577482798774 extends BaseCreateTable {
  protected tableName = 'product_barcode'

  public async up(queryRunner: QueryRunner): Promise<any> {
    const table = this.initTable([{
      name: 'barcode',
      type: 'varchar',
      length: '30',
    }, {
      name: 'name',
      type: 'text',
    }, {
      name: 'query_count',
      type: 'integer',
      default: 1,
    }, {
      name: 'product_id',
      type: 'uuid',
      isNullable: true,
    }], [{
      columnNames: ['product_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'product',
    }])

    const barcodeIndex = new TableIndex({
      columnNames: ['barcode'],
    })

    const queryCountIndex = new TableIndex({
      columnNames: ['query_count'],
    })

    await queryRunner.createTable(table)
    await queryRunner.createIndex(table, barcodeIndex)
    await queryRunner.createIndex(table, queryCountIndex)
  }
}
