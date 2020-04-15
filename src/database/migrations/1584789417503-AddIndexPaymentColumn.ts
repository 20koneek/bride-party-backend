import { MigrationInterface, QueryRunner, TableIndex } from 'typeorm'

export class AddIndexPaymentColumn1584789417503 implements MigrationInterface {
    protected tableName = 'payment'
    protected column = 'status'
    protected indexName = 'payment_status_index'

    public async up(queryRunner: QueryRunner): Promise<any> {
        const column = new TableIndex({
            name: this.indexName,
            columnNames: [this.column],
        })

        await queryRunner.createIndex(this.tableName, column)
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropIndex(this.tableName, this.indexName)
    }
}
