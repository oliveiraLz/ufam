import { MigrationInterface, QueryRunner } from "typeorm";

export class insertAdmin1681132465371 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        INSERT INTO acesso."user" (id,"name",email,"password",create_at,update_at,deleted_at) VALUES
         ('396d9a96-1b7c-429c-b9d2-a453b733df90','admin','admin@ipdec.org','$2b$06$83nN9rPUcBPHgZcTqwSPheEJubg2fOYmIhhmpQJQZaO.eb7eTNyra','2023-04-10 08:09:22.990622','2023-04-10 08:09:22.990622',NULL);
    
        INSERT INTO acesso."group" (id,"name",create_at,update_at,deleted_at) VALUES
         ('0bbca75e-3dd6-4d36-932f-03dfed7bfd42','Administrador','2023-04-10 08:09:27.827741','2023-04-10 08:09:27.827741',NULL);
    
        INSERT INTO acesso.groups_user ("userId","groupId") VALUES
         ('396d9a96-1b7c-429c-b9d2-a453b733df90','0bbca75e-3dd6-4d36-932f-03dfed7bfd42');
    
       INSERT INTO acesso."role" (id,"name",value,create_at,update_at,deleted_at) VALUES
         ('a05aa353-fc15-4405-906e-cc957a447125','ADMINISTRADOR',1,'2023-04-10 08:09:35.014529','2023-04-10 08:09:35.014529',NULL);

        INSERT INTO acesso.roles_groups ("groupId","roleId") VALUES
         ('0bbca75e-3dd6-4d36-932f-03dfed7bfd42','a05aa353-fc15-4405-906e-cc957a447125');
                `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
                    DELETE FROM acesso."user";
                    DELETE FROM acesso."group";
                    DELETE FROM acesso.roles_groups
                    DELETE FROM acesso."groups_user";
                    DELETE FROM acesso."role";
                `);
  }
}
