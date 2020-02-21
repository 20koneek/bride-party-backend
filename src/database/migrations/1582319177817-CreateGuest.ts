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
            name: 'firebase_uid',
            type: 'uuid',
        }])

        const firebaseUidIndex = new TableIndex({
            columnNames: ['firebase_uid'],
            isUnique: true,
        })

        await queryRunner.createTable(table)
        await queryRunner.createIndex(table, firebaseUidIndex)
    }
}
