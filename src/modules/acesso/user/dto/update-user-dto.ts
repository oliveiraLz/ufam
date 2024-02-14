import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  name: string;

  @IsOptional()
  email: string;

  @IsArray()
  @IsString({
    each: true,
    message: 'Uuid de Grupos precisam ser uma string',
  })
  @IsOptional()
  groups: string[];

  @IsOptional()
  password: string;
}
