import { QueryRunner } from 'typeorm'
import { BaseCreateTable } from '../BaseCreateTable'

export class CreateGuestCard1586720421748 extends BaseCreateTable {
    protected tableName = 'guest_card'

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = this.initTable([{
            name: 'pan_mask',
            type: 'varchar',
            length: '16',
        }, {
            name: 'card_uid',
            type: 'varchar',
            length: '30',
        }, {
            name: 'month',
            type: 'smallint',
        }, {
            name: 'year',
            type: 'smallint',
        }, {
            name: 'status',
            type: 'varchar',
            length: '50',
        }, {
            name: 'card_holder',
            type: 'varchar',
            length: '50',
        }, {
            name: 'guest_id',
            type: 'uuid',
        }], [{
            columnNames: ['guest_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'guest',
        }])

        await queryRunner.createTable(table)
    }
}
