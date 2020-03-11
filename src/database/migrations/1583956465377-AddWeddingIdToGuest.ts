import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm'

export class AddWeddingIdToGuest1583956465377 implements MigrationInterface {
    protected tableName = 'guest'
    protected weddingId = 'wedding_id'
    protected referencedTableName = 'wedding'

    public async up(queryRunner: QueryRunner): Promise<any> {
        const foreignIdColumn = new TableColumn({
            type: 'uuid',
            name: this.weddingId,
        })

        const foreignKey = new TableForeignKey({
            columnNames: [this.weddingId],
            referencedColumnNames: ['id'],
            referencedTableName: this.referencedTableName,
        })

        await queryRunner.addColumn(this.tableName, foreignIdColumn)
        await queryRunner.createForeignKey(this.tableName, foreignKey)
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn(this.tableName, this.weddingId)
    }
}
