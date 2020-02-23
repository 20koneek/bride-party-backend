import { QueryRunner, TableIndex } from 'typeorm'
import { BaseCreateTable } from '../BaseCreateTable'

export class CreateGuest1582319177817 extends BaseCreateTable {
    protected tableName = 'guest'

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = this.initTable([{
            name: 'name',
            type: 'varchar',
            length: '30',
        }, {
            name: 'token',
            type: 'uuid',
        }, {
            name: 'salt',
            type: 'varchar',
            length: '40',
        }])

        const tokenIndex = new TableIndex({
            columnNames: ['token'],
            isUnique: true,
        })

        await queryRunner.createTable(table)
        await queryRunner.createIndex(table, tokenIndex)
    }
}
