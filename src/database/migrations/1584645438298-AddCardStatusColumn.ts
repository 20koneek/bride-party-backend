import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddCardStatusColumn1584645438298 implements MigrationInterface {
    protected tableName = 'guest'
    protected column = 'card_status'

    public async up(queryRunner: QueryRunner): Promise<any> {
        const column = new TableColumn({
            name: this.column,
            type: 'varchar',
            length: '30',
            default: '\'NotSet\'',
        })

        await queryRunner.addColumn(this.tableName, column)
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn(this.tableName, this.column)
    }
}
