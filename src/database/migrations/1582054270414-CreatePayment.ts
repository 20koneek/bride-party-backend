import { QueryRunner } from 'typeorm'
import { BaseCreateTable } from '../BaseCreateTable'

export class CreatePayment1582054270414 extends BaseCreateTable {
    protected tableName = 'payment'

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = this.initTable([{
            name: 'amount',
            type: 'integer',
        }, {
            name: 'status',
            type: 'varchar',
            length: '15',
        }])

        await queryRunner.createTable(table)
    }
}
