import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateAdminTenant1683127777996 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(` 
        INSERT INTO acesso.tenant (id,name,create_at,update_at,deleted_at) VALUES
        ('e3baee0a-0454-4354-aad9-45b0aec72742','IPDEC Homologação','2023-05-03 10:59:51.993711','2023-05-03 10:59:51.993711',NULL);

        UPDATE acesso.group set tenant_id = 'e3baee0a-0454-4354-aad9-45b0aec72742' WHERE id = '0bbca75e-3dd6-4d36-932f-03dfed7bfd42';

        
                                                       `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    
                `);
  }
}
