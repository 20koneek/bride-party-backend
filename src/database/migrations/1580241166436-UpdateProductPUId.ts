import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class UpdateProductPUId1580241166436 implements MigrationInterface {
  private table = 'product'

  public async up(queryRunner: QueryRunner): Promise<any> {

    const productUnitColumn = new TableColumn({
      type: 'uuid',
      name: 'product_unit_id',
      isNullable: true,
    })

    await queryRunner.changeColumn(this.table, 'product_unit_id', productUnitColumn)
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const productUnitColumn = new TableColumn({
      type: 'uuid',
      name: 'product_unit_id',
      isNullable: false,
    })

    await queryRunner.changeColumn(this.table, 'product_unit_id', productUnitColumn)
  }
}
