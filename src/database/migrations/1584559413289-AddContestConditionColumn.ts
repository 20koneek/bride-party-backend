import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm'

export class AddContestConditionColumn1584559413289 implements MigrationInterface {
    protected tableName = 'payment'
    protected referencedTableName = 'contest_condition'
    protected idColumn = `${this.referencedTableName}_id`

    public async up(queryRunner: QueryRunner): Promise<any> {
        const idColumn = new TableColumn({
            type: 'uuid',
            name: this.idColumn,
        })

        const foreignKey = new TableForeignKey({
            columnNames: [this.idColumn],
            referencedColumnNames: ['id'],
            referencedTableName: this.referencedTableName,
        })

        await queryRunner.addColumn(this.tableName, idColumn)
        await queryRunner.createForeignKey(this.tableName, foreignKey)
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn(this.tableName, this.idColumn)
    }
}
