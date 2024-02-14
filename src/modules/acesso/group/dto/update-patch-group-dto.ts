import { IsOptional } from 'class-validator';

export class UpdatePatchGroupDto {
  @IsOptional()
  name: string;

  @IsOptional()
  role: string[];
}
