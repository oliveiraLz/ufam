import { MigrationInterface, QueryRunner } from "typeorm";

export class alter_tableGroup1681329026741 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(` 
            ALTER TABLE acesso.group
            ADD COLUMN tenant_id uuid REFERENCES acesso.tenant(id) ON DELETE NO ACTION
            ON UPDATE NO ACTION
            NOT DEFERRABLE;

            INSERT INTO acesso.tenant (id,name,create_at,update_at,deleted_at) VALUES
	 ('372b7820-a1cb-4e31-930b-dcb0bcaf7503','Instituto IPDEC','2023-04-12 16:05:51.021499','2023-04-12 16:05:51.021499',NULL);

            UPDATE acesso.group SET tenant_id = '372b7820-a1cb-4e31-930b-dcb0bcaf7503' WHERE id = '0bbca75e-3dd6-4d36-932f-03dfed7bfd42'


                                            `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE acesso.group DROP COLUMN tenant_id;
                                            `);
  }
}
