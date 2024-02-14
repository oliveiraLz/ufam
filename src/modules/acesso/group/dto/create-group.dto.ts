import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateGroupDto {
  @IsNotEmpty({
    message: 'Nome não pode ser vazio',
  })
  name: string;

  @IsArray()
  @IsString({
    each: true,
    message: 'uuid de permissões precisam ser uma string',
  })
  @ArrayMinSize(1)
  @IsOptional()
  role: string[];

  @IsOptional()
  tenant: string;
}
