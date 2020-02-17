import { QueryRunner } from 'typeorm'
import { BaseCreateTable } from '../BaseCreateTable'

export class CreateCheckResponse1553772820363 extends BaseCreateTable {
  protected tableName = 'check_response'

  public async up(queryRunner: QueryRunner): Promise<any> {
    const table = this.initTable([{
      name: 'response',
      type: 'jsonb',
    }, {
      name: 'check_param_id',
      type: 'uuid',
    }], [{
      columnNames: ['check_param_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'check_param',
    }])

    await queryRunner.createTable(table)
  }
}
