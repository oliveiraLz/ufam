import { ApiProperty } from "@nestjs/swagger";
import { Parametros } from "../entities/parametro.entity";

export class ReturnParametrosDto {
  @ApiProperty({ description: "a Chave do parametro" })
  chave: string;

  @ApiProperty({ description: "o Valor do parametro" })
  valor: string;

  constructor(data: Parametros) {
    this.chave = data.chave;
    this.valor = data.valor;
  }
}
