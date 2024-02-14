import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAnexoTable1707866033087 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TABLE cadastro.anexo (
        id UUID DEFAULT uuid_generate_v4() NOT NULL,
        arquivo VARCHAR NOT NULL,
        arquivo_nome VARCHAR NOT NULL,
        email_id UUID NOT NULL,
        created_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT now() NOT NULL,
        updated_at TIMESTAMP,
        deleted_at TIMESTAMP,
        PRIMARY KEY (id),
        CONSTRAINT FK_anexo_email FOREIGN KEY (email_id) REFERENCES cadastro.email(id) ON DELETE CASCADE
    );

    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE IF EXISTS cadastro.anexo;
    `);
  }
}
