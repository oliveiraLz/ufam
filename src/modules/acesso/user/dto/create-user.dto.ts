import { IsArray, IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({ description: "Nome completo do usuário" })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: "Email do usuário" })
  @IsNotEmpty({
    message: "Email não pode ser vazio",
  })
  @IsEmail()
  email: string;

  @ApiProperty({ description: "Senha do usuário" })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: "Grupo do usuário" })
  @IsArray()
  @IsString({
    each: true,
    message: "Uuid de Grupos precisam ser uma string",
  })
  @IsOptional()
  groups: string[];
}
