import { MigrationInterface, QueryRunner } from "typeorm";

export class alterTableRoleNameRole1681753017372 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(` 
                        ALTER TABLE acesso.role ADD COLUMN name_role varchar 
                                                        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
                        ALTER TABLE acesso.role
                        DROP COLUMN name_role;
        `);
  }
}
