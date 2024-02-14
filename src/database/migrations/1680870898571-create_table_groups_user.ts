import { MigrationInterface, QueryRunner } from "typeorm";

export class createTableGroupsUser1680870898571 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(` 
            CREATE TABLE acesso.groups_user (
                "userId" uuid NOT NULL,
                "groupId" uuid NOT NULL,
                PRIMARY KEY ("userId", "groupId"),
                FOREIGN KEY ("userId") REFERENCES acesso."user"(id) ON DELETE CASCADE ON UPDATE CASCADE,
                FOREIGN KEY ("groupId") REFERENCES acesso."group"(id)
                          );
                        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
                          DROP TABLE IF EXISTS acesso.groups_user;
                        `);
  }
}
