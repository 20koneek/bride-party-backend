import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm'

export class AddGuestIdToPayment1582982146730 implements MigrationInterface {
    protected tableName = 'payment'
    protected guestId = 'guest_id'
    protected status = 'status'

    public async up(queryRunner: QueryRunner): Promise<any> {
        const guestIdColumn = new TableColumn({
            type: 'uuid',
            name: this.guestId,
        })

        const statusColumn = new TableColumn({
            name: this.status,
            type: 'varchar',
            length: '15',
            default: '\'Init\'',
        })

        const guestForeignKey = new TableForeignKey({
            columnNames: [this.guestId],
            referencedColumnNames: ['id'],
            referencedTableName: 'guest',
        })

        await queryRunner.addColumn(this.tableName, guestIdColumn)
        await queryRunner.createForeignKey(this.tableName, guestForeignKey)
        await queryRunner.changeColumn(this.tableName, this.status, statusColumn)
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        const statusColumn = new TableColumn({
            name: this.status,
            type: 'varchar',
            length: '15',
        })

        await queryRunner.dropColumn(this.tableName, this.guestId)
        await queryRunner.changeColumn(this.tableName, this.status, statusColumn)
    }
}
