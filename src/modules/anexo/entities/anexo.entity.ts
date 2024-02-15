import { Base } from "../../../decorators/base.entity";
import { Email } from "../../../modules/email/entities/email.entity";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";

@Entity({ name: "anexo", schema: "cadastro" })
export class Anexo extends Base {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  arquivo: string;

  @Column({ nullable: false })
  arquivo_nome: string;

  @Column()
  email_id: string;

  @ManyToOne(() => Email, (email) => email.anexo)
  @JoinColumn({ name: "email_id" })
  email: Email;
}
