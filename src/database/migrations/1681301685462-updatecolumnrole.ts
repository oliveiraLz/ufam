import { MigrationInterface, QueryRunner } from "typeorm";

export class updatecolumnrole1681301685462 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(` 
        ALTER TABLE acesso.role 
        ADD COLUMN application_group_id uuid REFERENCES acesso.application_group(id)   ON DELETE NO ACTION
        ON UPDATE NO ACTION
        NOT DEFERRABLE;
                                        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE acesso.role 
        DROP COLUMN application_group_id;
                                        `);
  }
}
