import { IsNotEmpty } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty({
    message: 'Nome não pode ser vazio',
  })
  name: string;

  @IsNotEmpty({
    message: 'Codigo não pode ser vazio',
  })
  value: number;
}
