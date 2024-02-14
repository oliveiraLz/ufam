import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ schema: "configuracao", name: "parametro" })
export class Parametros {
  @ApiProperty({ example: "texto", description: "A string digitada será a chave do parâmetro." })
  @PrimaryColumn({ type: "varchar" })
  chave: string;

  @ApiProperty({ example: "texto", description: "A string digitada será o valor do parâmetro." })
  @Column({ type: "varchar" })
  valor: string;
}
