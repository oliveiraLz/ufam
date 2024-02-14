import { PartialType } from '@nestjs/swagger';
import { CreateAnexoDto } from './create-anexo.dto';

export class UpdateAnexoDto extends PartialType(CreateAnexoDto) {}
