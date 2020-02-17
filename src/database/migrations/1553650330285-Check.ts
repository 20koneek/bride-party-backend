import { QueryRunner } from 'typeorm'
import { BaseCreateTable } from '../BaseCreateTable'

export class CreateCheck1553650330285 extends BaseCreateTable {
  protected tableName = 'check'

  public async up(queryRunner: QueryRunner): Promise<any> {
    const table = this.initTable([{
      name: 'name',
      type: 'varchar',
      length: '255',
      isNullable: true,
    }, {
      name: 'date_time',
      type: 'timestamp',
    }, {
      name: 'total_sum',
      type: 'integer',
    }, {
      name: 'status',
      type: 'varchar',
      length: '10',
      default: '\'init\'',
    }])

    await queryRunner.createTable(table)
  }
}
