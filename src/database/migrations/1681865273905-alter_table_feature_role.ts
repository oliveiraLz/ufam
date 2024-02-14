import { MigrationInterface, QueryRunner } from "typeorm";

export class alterTableFeatureRole1681865273905 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(` 
        ALTER TABLE acesso.role
            DROP CONSTRAINT role_application_group_id_fkey RESTRICT;
    
        ALTER TABLE acesso.role
            DROP CONSTRAINT role_fk1 RESTRICT;
    
        ALTER TABLE acesso.feature
            ADD COLUMN application_group_id UUID;
    
        ALTER TABLE acesso.role
            DROP COLUMN application_group_id;
    
        ALTER TABLE acesso.feature
            ADD CONSTRAINT feature_fk FOREIGN KEY (application_group_id)
            REFERENCES acesso.application_group(id)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION
            NOT DEFERRABLE;
    
        ALTER TABLE acesso.role
            ADD CONSTRAINT role_fk FOREIGN KEY (feature_id)
            REFERENCES acesso.feature(id)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION
            NOT DEFERRABLE;

        DELETE FROM acesso.roles_groups WHERE "roleId" = '35505add-e4d2-4381-a760-17d91e8728ac';

        DELETE FROM acesso.role WHERE id = '35505add-e4d2-4381-a760-17d91e8728ac';
        
        UPDATE acesso.feature SET application_group_id = '198ed396-d40e-4515-912b-ef1be0025496' 
        WHERE id IN ('1a0b73ed-9019-434c-9b8e-2f7e6b455512','ab4aac9d-6e99-4835-82e2-05bd94c30abf');        

                                                            `);
  }

  //   DELETE FROM acesso.role WHERE id = '35505add-e4d2-4381-a760-17d91e8728ac';

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`

            `);
  }
}
