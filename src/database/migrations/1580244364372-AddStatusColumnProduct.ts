import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddStatusColumnProduct1580244364372 implements MigrationInterface {
  private table = 'product'

  public async up(queryRunner: QueryRunner): Promise<any> {
    const retailerColumn = new TableColumn({
      name: 'status',
      type: 'varchar',
      length: '10',
      default: '\'init\'',
    })

    await queryRunner.addColumn(this.table, retailerColumn)
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropColumn(this.table, 'status')
  }
}
