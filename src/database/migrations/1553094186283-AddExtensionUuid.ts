import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddExtensionUuid1553094186283 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.connection.query(`CREATE extension IF NOT EXISTS "uuid-ossp"`)
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.connection.query(`DROP extension IF EXISTS "uuid-ossp"`)
  }
}
