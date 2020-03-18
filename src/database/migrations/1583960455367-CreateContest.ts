import { QueryRunner } from 'typeorm'
import { BaseCreateTable } from '../BaseCreateTable'

export class CreateContest1583960455367 extends BaseCreateTable {
    protected tableName = 'contest'

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = this.initTable([{
            name: 'name',
            type: 'varchar',
            length: '30',
        }])

        await queryRunner.createTable(table)
    }
}
