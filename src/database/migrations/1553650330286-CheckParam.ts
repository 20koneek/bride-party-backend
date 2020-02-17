import { QueryRunner, TableIndex } from 'typeorm'
import { BaseCreateTable } from '../BaseCreateTable'

export class CreateCheckParam1553650330286 extends BaseCreateTable {
  protected tableName = 'check_param'

  public async up(queryRunner: QueryRunner): Promise<any> {
    const table = this.initTable([{
      name: 't',
      type: 'varchar',
      length: '20',
    }, {
      name: 's',
      type: 'varchar',
      length: '20',
    }, {
      name: 'fn',
      type: 'varchar',
      length: '20',
    }, {
      name: 'i',
      type: 'varchar',
      length: '20',
    }, {
      name: 'fp',
      type: 'varchar',
      length: '20',
    }, {
      name: 'n',
      type: 'varchar',
      length: '1',
    }, {
      name: 'check_id',
      type: 'uuid',
    }], [{
      columnNames: ['check_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'check',
    }])

    const tableIndex = new TableIndex({
      columnNames: ['fn', 'i', 'fp'],
      // isUnique: true,
    })

    await queryRunner.createTable(table)
    await queryRunner.createIndex(table, tableIndex)
  }
}
