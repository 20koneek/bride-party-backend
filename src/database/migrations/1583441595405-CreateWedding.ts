import { QueryRunner } from 'typeorm'
import { BaseCreateTable } from '../BaseCreateTable'

export class CreateWedding1583441595405 extends BaseCreateTable {
    protected tableName = 'wedding'

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = this.initTable([{
            name: 'name',
            type: 'varchar',
            length: '50',
        }])

        await queryRunner.createTable(table)
    }
}
