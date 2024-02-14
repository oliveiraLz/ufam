import { MigrationInterface, QueryRunner } from "typeorm";

export class alterTableGroupsUser1682444115619 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(` 
            ALTER TABLE acesso.groups_user RENAME COLUMN "userId" TO user_id;

            ALTER TABLE acesso.groups_user RENAME COLUMN "groupId" TO group_id;     
            
            ALTER TABLE acesso.roles_groups RENAME COLUMN "roleId" TO role_id;

            ALTER TABLE acesso.roles_groups RENAME COLUMN "groupId" TO group_id;                 
                                                       `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    
                `);
  }
}
