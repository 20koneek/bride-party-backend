import { MigrationInterface, QueryRunner, Table } from 'typeorm'
import { TableColumnOptions } from 'typeorm/schema-builder/options/TableColumnOptions'
import { TableForeignKeyOptions } from 'typeorm/schema-builder/options/TableForeignKeyOptions'

export abstract class BaseCreateTable implements MigrationInterface {
  protected abstract tableName

  public abstract async up(queryRunner: QueryRunner): Promise<any>

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable(this.tableName)
  }

  protected initTable(columns: TableColumnOptions[], foreignKeys?: TableForeignKeyOptions[]): Table {
    return new Table({
      name: this.tableName,
      columns: [
        {
          name: 'id',
          type: 'uuid',
          default: 'uuid_generate_v4()',
          isPrimary: true,
        },
        ...columns,
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'LOCALTIMESTAMP',
        },
        {
          name: 'updated_at',
          type: 'timestamp',
          default: 'LOCALTIMESTAMP',
        },
      ],
      foreignKeys,
    })
  }
}
