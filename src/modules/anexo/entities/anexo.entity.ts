import { Base } from "../../../decorators/base.entity";
import { Email } from "../../../modules/email/entities/email.entity";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

@Entity({ name: "anexo", schema: "cadastro" })
export class Anexo extends Base {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  arquivo: string;

  @Column({ nullable: false })
  arquivo_nome: string;

  @ManyToOne(() => Email, (email) => email.anexo)
  email: Email;
}
