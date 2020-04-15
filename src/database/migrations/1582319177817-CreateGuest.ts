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
            name: 'uid',
            type: 'varchar',
            length: '28',
        }, {
            name: 'salt',
            type: 'varchar',
            length: '40',
        }, {
            name: 'payment_id',
            type: 'uuid',
            isNullable: true,
        }], [{
            columnNames: ['payment_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'payment',
        }])

        const uidIndex = new TableIndex({
            columnNames: ['uid'],
            isUnique: true,
        })

        await queryRunner.createTable(table)
        await queryRunner.createIndex(table, uidIndex)
    }
}
