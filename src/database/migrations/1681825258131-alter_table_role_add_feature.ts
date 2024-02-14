import { MigrationInterface, QueryRunner } from "typeorm";

export class alterTableRoleAddFeature1681825258131 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(` 

        TRUNCATE TABLE acesso.role CASCADE;

        ALTER TABLE acesso.role DROP COLUMN descricao;

        ALTER TABLE acesso.role DROP COLUMN name_role;

        ALTER TABLE acesso.role DROP COLUMN value;

        ALTER TABLE acesso.role ADD COLUMN feature_id UUID NOT NULL;

        CREATE TABLE acesso.feature (
            id UUID DEFAULT uuid_generate_v4() NOT NULL,
            name VARCHAR NOT NULL,
            description VARCHAR,
            create_at timestamp NOT NULL DEFAULT now(),
            update_at timestamp NOT NULL DEFAULT now(),
            deleted_at timestamp NULL,            
            CONSTRAINT feature_pkey PRIMARY KEY(id),
            UNIQUE(name)
          );        

        ALTER TABLE acesso.role
          ADD CONSTRAINT role_fk1 FOREIGN KEY (feature_id)
            REFERENCES acesso.feature(id)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION
            NOT DEFERRABLE; 

        INSERT INTO acesso.feature (id,name,description,create_at,update_at,deleted_at) VALUES
        ('ab4aac9d-6e99-4835-82e2-05bd94c30abf','Usuário','Gerenciamento de Acesso dos Usuários','2023-04-18 10:17:06.827745','2023-04-18 10:17:06.827745',NULL),
        ('1a0b73ed-9019-434c-9b8e-2f7e6b455512','Grupo','Gerenciamento de Grupos de permissões','2023-04-18 10:19:12.817094','2023-04-18 10:19:12.817094',NULL);

        INSERT INTO acesso."role" (id,"name",create_at,update_at,deleted_at,application_group_id,feature_id) VALUES
        ('35505add-e4d2-4381-a760-17d91e8728ac','ADMINISTRADOR','2023-04-18 10:35:59.941949','2023-04-18 10:35:59.941949',NULL,'198ed396-d40e-4515-912b-ef1be0025496','ab4aac9d-6e99-4835-82e2-05bd94c30abf'),
        ('065118d4-4b23-4861-8657-9cb70fa18d6e','USUARIO_READ','2023-04-18 10:40:17.915676','2023-04-18 10:40:17.915676',NULL,'198ed396-d40e-4515-912b-ef1be0025496','ab4aac9d-6e99-4835-82e2-05bd94c30abf'),
        ('3efdeda9-12ca-49ce-96e3-db5879b4c619','USUARIO_WRITE','2023-04-18 10:40:17.922131','2023-04-18 10:40:17.922131',NULL,'198ed396-d40e-4515-912b-ef1be0025496','ab4aac9d-6e99-4835-82e2-05bd94c30abf'),
        ('909cc25c-e323-45ba-9767-410947b9cb50','USUARIO_DELETE','2023-04-18 10:40:17.923959','2023-04-18 10:40:17.923959',NULL,'198ed396-d40e-4515-912b-ef1be0025496','ab4aac9d-6e99-4835-82e2-05bd94c30abf'),
        ('6fc0c18b-1340-49bb-9c60-27a2d2698246','GRUPO_READ','2023-04-18 10:40:17.929652','2023-04-18 10:40:17.929652',NULL,'198ed396-d40e-4515-912b-ef1be0025496','1a0b73ed-9019-434c-9b8e-2f7e6b455512'),
        ('8e7ed383-d3e3-4a94-b318-47c043148913','GRUPO_WRITE','2023-04-18 10:40:17.926261','2023-04-18 10:40:17.926261',NULL,'198ed396-d40e-4515-912b-ef1be0025496','1a0b73ed-9019-434c-9b8e-2f7e6b455512'),
        ('b63e90ec-3d77-45b2-863d-64c2772bc902','GRUPO_DELETE','2023-04-18 10:40:17.92845','2023-04-18 10:40:17.92845',NULL,'198ed396-d40e-4515-912b-ef1be0025496','1a0b73ed-9019-434c-9b8e-2f7e6b455512');
        

        INSERT INTO acesso.roles_groups("groupId", "roleId") VALUES
        ('0bbca75e-3dd6-4d36-932f-03dfed7bfd42', '35505add-e4d2-4381-a760-17d91e8728ac');

        ALTER TABLE acesso.group ADD COLUMN admin boolean NOT NULL default false;

        UPDATE acesso.group SET admin=true WHERE id = '0bbca75e-3dd6-4d36-932f-03dfed7bfd42';

                                                            `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
 


            `);
  }
}
