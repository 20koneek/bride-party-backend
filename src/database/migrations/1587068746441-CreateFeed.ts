import { QueryRunner } from 'typeorm'
import { BaseCreateTable } from '../BaseCreateTable'

export class CreateFeed1587068746441 extends BaseCreateTable {
    protected tableName = 'feed'

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = this.initTable([{
            name: 'wedding_id',
            type: 'uuid',
        }], [{
            columnNames: ['wedding_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'wedding',
        }])

        await queryRunner.createTable(table)
    }
}
