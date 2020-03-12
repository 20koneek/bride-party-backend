import { QueryRunner } from 'typeorm'
import { BaseCreateTable } from '../BaseCreateTable'

export class CreateContestWedding1584041575421 extends BaseCreateTable {
    protected tableName = 'contest_wedding'

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = this.initTable([{
            name: 'contest_id',
            type: 'uuid',
        }, {
            name: 'wedding_id',
            type: 'uuid',
        }], [{
            columnNames: ['contest_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'contest',
        }, {
            columnNames: ['wedding_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'wedding',
        }])

        await queryRunner.createTable(table)
    }
}
