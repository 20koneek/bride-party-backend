import { QueryRunner } from 'typeorm'
import { BaseCreateTable } from '../BaseCreateTable'

export class CreatePost1587070578805 extends BaseCreateTable {
    protected tableName = 'post'

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = this.initTable([{
            name: 'guest_id',
            type: 'uuid',
        },{
            name: 'feed_id',
            type: 'uuid',
        }], [{
            columnNames: ['guest_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'guest',
        },{
            columnNames: ['feed_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'feed',
        }])

        await queryRunner.createTable(table)
    }
}
