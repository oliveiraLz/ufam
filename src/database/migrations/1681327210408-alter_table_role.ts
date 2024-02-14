import { MigrationInterface, QueryRunner } from "typeorm";

export class alterTableRole1681327210408 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(` 
                    ALTER TABLE acesso.role ADD COLUMN descricao varchar 
                                                    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
                    ALTER TABLE acesso.role
                    DROP COLUMN descricao;
    `);
  }
}
