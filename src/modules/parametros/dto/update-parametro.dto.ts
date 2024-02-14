import { PartialType } from "@nestjs/swagger";
import { CreateParametrosDto } from "./create-parametro.dto";

export class UpdateParametrosDto extends PartialType(CreateParametrosDto) {}
