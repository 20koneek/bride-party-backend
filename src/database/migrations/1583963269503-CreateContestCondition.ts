import { QueryRunner } from 'typeorm'
import { BaseCreateTable } from '../BaseCreateTable'

export class CreateContestCondition1583963269503 extends BaseCreateTable {
    protected tableName = 'contest_condition'

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = this.initTable([{
            name: 'name',
            type: 'varchar',
            length: '30',
        }, {
            name: 'contest_id',
            type: 'uuid',
        }], [{
            columnNames: ['contest_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'contest',
        }])

        await queryRunner.createTable(table)
    }
}
