import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Base } from "../../../decorators/base.entity";
import { Anexo } from "../../../modules/anexo/entities/anexo.entity";

@Entity({ name: "email", schema: "cadastro" })
export class Email extends Base {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  Nome: string;

  @Column({ nullable: true })
  cpf: string;

  @Column({ nullable: false })
  destinatario: string;

  @Column({ nullable: true })
  mensagem: string;

  @Column()
  titulo: string;

  @Column({ nullable: false })
  tipo: string;

  @OneToMany(() => Anexo, (anexo) => anexo.email)
  anexo: Anexo[];

  @Column({ type: "timestamp" })
  enviado: Date;
}
