import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateParametrosTable1707446676205 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE SCHEMA IF NOT EXISTS configuracao;
    CREATE TABLE configuracao.parametro (
        chave VARCHAR NOT NULL,
        valor VARCHAR NOT NULL,
        created_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT now() NOT NULL,
        updated_at TIMESTAMP,
        deleted_at TIMESTAMP
      );

    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE IF EXISTS configuracao.parametro;
    `);
  }
}
