import { MigrationInterface, QueryRunner } from "typeorm";

export class createTableRolesGroups1680873866721 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(` 
                CREATE TABLE acesso.roles_groups (
                    "groupId" uuid NOT NULL,
                    "roleId" uuid NOT NULL,
                    PRIMARY KEY ("groupId", "roleId"),
                    FOREIGN KEY ("groupId") REFERENCES acesso."group"(id) ON DELETE CASCADE ON UPDATE CASCADE,
                    FOREIGN KEY ("roleId") REFERENCES acesso."role"(id)
                );
                            `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
                              DROP TABLE IF EXISTS acesso.roles_groups;
                            `);
  }
}
