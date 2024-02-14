import { MigrationInterface, QueryRunner } from "typeorm";

export class updatecolumnApplicationGroup1681313013866 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(` 
                ALTER TABLE acesso.application_group 
                ADD COLUMN application_id uuid NOT NULL REFERENCES acesso.application(id) ON DELETE NO ACTION
                ON UPDATE NO ACTION
                NOT DEFERRABLE;
                                                `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
                ALTER TABLE acesso.application_group 
                DROP COLUMN application_id;
                                                `);
  }
}
