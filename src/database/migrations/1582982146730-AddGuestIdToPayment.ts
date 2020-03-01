import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm'

export class AddGuestIdToPayment1582982146730 implements MigrationInterface {
    protected tableName = 'payment'
    protected guestId = 'guest_id'

    public async up(queryRunner: QueryRunner): Promise<any> {

        const guestIdColumn = new TableColumn({
            type: 'uuid',
            name: this.guestId,
        })

        const guestForeignKey = new TableForeignKey({
            columnNames: [this.guestId],
            referencedColumnNames: ['id'],
            referencedTableName: 'guest',
        })

        await queryRunner.addColumn(this.tableName, guestIdColumn)
        await queryRunner.createForeignKey(this.tableName, guestForeignKey)
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn(this.tableName, this.guestId)
    }
}
