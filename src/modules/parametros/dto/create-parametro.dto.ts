import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateParametrosDto {
  @ApiProperty({ description: "Informe a Chave" })
  @IsNotEmpty()
  chave: string;

  @ApiProperty({ description: "Informe o Valor" })
  @IsNotEmpty()
  valor: string;
}
