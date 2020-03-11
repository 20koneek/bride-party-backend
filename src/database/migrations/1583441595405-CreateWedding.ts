import { QueryRunner } from 'typeorm'
import { BaseCreateTable } from '../BaseCreateTable'

export class CreateWedding1583441595405 extends BaseCreateTable {
    protected tableName = 'wedding'

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = this.initTable([
            // {
            //     name: 'man_name',
            //     type: 'varchar',
            //     length: '30',
            // },{
            //     name: 'woman_name',
            //     type: 'varchar',
            //     length: '30',
            // }, {
            //     name: 'place',
            //     type: 'varchar',
            //     length: '30',
            // },{
            //     name: 'started_at',
            //     type: 'timestamp',
            // }, {
            //     name: 'finished_at',
            //     type: 'timestamp',
            // }
        ])

        await queryRunner.createTable(table)
    }
}
