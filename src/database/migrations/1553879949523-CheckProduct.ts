import { QueryRunner } from 'typeorm'
import { BaseCreateTable } from '../BaseCreateTable'

export class CreateCheckProduct1553879949523 extends BaseCreateTable {
  protected tableName = 'check_product'

  public async up(queryRunner: QueryRunner): Promise<any> {
    const table = this.initTable([{
      name: 'name',
      type: 'varchar',
      length: '255',
      isNullable: false,
    }, {
      name: 'quantity',
      type: 'double precision',
      isNullable: false,
    }, {
      name: 'sum',
      type: 'integer',
      isNullable: false,
    }, {
      name: 'price',
      type: 'integer',
      isNullable: false,
    }, {
      name: 'check_id',
      type: 'uuid',
    }], [{
      columnNames: ['check_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'check',
      onDelete: 'CASCADE',
    }])

    await queryRunner.createTable(table)
  }
}
