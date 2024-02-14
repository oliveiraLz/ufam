import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEmailTable1707486372544 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE SCHEMA IF NOT EXISTS cadastro;

    CREATE TABLE cadastro.email (
        id UUID DEFAULT uuid_generate_v4() NOT NULL,
        nome VARCHAR NOT NULL,
        cpf VARCHAR,
        destinatario VARCHAR NOT NULL,
        mensagem VARCHAR,
        titulo VARCHAR NOT NULL,
        tipo VARCHAR NOT NULL,
        copia BOOLEAN NOT NULL,
        enviado TIMESTAMP ,
        created_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT now() NOT NULL,
        updated_at TIMESTAMP,
        deleted_at TIMESTAMP,
        PRIMARY KEY (id)
    );    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE IF EXISTS cadastro.email;
    `);
  }
}
