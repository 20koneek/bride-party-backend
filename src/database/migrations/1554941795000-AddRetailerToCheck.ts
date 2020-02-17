import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm'

export class AddRetailerToCheck1554941795000 implements MigrationInterface {
  private checkTable = 'check'

  public async up(queryRunner: QueryRunner): Promise<any> {

    const retailerColumn = new TableColumn({
      type: 'uuid',
      name: 'retailer_id',
      isNullable: true,
    })

    const retailerForeignKey = new TableForeignKey({
      columnNames: ['retailer_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'retailer',
    })

    const storeColumn = new TableColumn({
      type: 'uuid',
      name: 'store_id',
      isNullable: true,
    })

    const storeForeignKey = new TableForeignKey({
      columnNames: ['store_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'store',
    })

    await queryRunner.addColumn(this.checkTable, retailerColumn)
    await queryRunner.addColumn(this.checkTable, storeColumn)
    await queryRunner.createForeignKey(this.checkTable, retailerForeignKey)
    await queryRunner.createForeignKey(this.checkTable, storeForeignKey)
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropColumn(this.checkTable, 'store_id')
    await queryRunner.dropColumn(this.checkTable, 'retailer_id')
  }
}
