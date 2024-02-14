import { MigrationInterface, QueryRunner } from "typeorm";

export class insertApplicationGroupRole1681327743724 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        INSERT INTO acesso.application (id,name,create_at,update_at,deleted_at) VALUES
        ('5b9c05ce-5c2b-48f5-9281-2429682c4f35','BALANDRAU-GILAM','2023-04-12 11:42:00.518916','2023-04-12 11:42:00.518916',NULL);
   
        INSERT INTO acesso.application_group (id,name,create_at,update_at,deleted_at,application_id) VALUES
        ('e45b92a9-c7b2-4ad4-9605-9082a31c0d6c','Cadastro','2023-04-12 11:29:00.970794','2023-04-12 11:29:00.970794',NULL,'5b9c05ce-5c2b-48f5-9281-2429682c4f35'),
        ('198ed396-d40e-4515-912b-ef1be0025496','Controle de Acesso','2023-04-12 15:13:09.77996','2023-04-12 15:13:09.77996',NULL,'5b9c05ce-5c2b-48f5-9281-2429682c4f35');

        INSERT INTO acesso."role" (id,name,value,create_at,update_at,deleted_at,application_group_id,descricao) VALUES
        ('8570bae8-6beb-4762-907a-4a625b489ef2','USUARIO_LIST',2,'2023-04-12 15:37:44.315068','2023-04-12 15:37:44.315068',NULL,'198ed396-d40e-4515-912b-ef1be0025496','Lista de usuários do sistema'),
        ('a6635f7e-33f1-4c4a-b7a7-b3a44141d676','USUARIO_WRITE',3,'2023-04-12 15:37:44.320479','2023-04-12 15:37:44.320479',NULL,'198ed396-d40e-4515-912b-ef1be0025496','Permissão de escrita de usuários'),
        ('7d242f14-70ca-41da-848d-294ba57e5849','GRUPO_LIST',4,'2023-04-12 15:37:44.322014','2023-04-12 15:37:44.322014',NULL,'198ed396-d40e-4515-912b-ef1be0025496','Lista de Grupos'),
        ('adff529c-4aff-452d-914b-c4035ba5a154','GRUPO_WRITE',5,'2023-04-12 15:37:44.324859','2023-04-12 15:37:44.324859',NULL,'198ed396-d40e-4515-912b-ef1be0025496','Permissão de escrita para grupos');        
           
                    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
                        DELETE FROM acesso.application;
                        DELETE FROM acesso.application_group;
                    `);
  }
}
