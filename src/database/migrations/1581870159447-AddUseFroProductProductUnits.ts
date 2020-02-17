import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddUseFroProductProductUnits1581870159447 implements MigrationInterface {
  private table = 'product_unit'

  public async up(queryRunner: QueryRunner): Promise<any> {

    const useForProductColumn = new TableColumn({
      type: 'boolean',
      name: 'use_for_product',
      default: false,
    })

    await queryRunner.addColumn(this.table, useForProductColumn)
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropColumn(this.table, 'use_for_product')
  }
}
