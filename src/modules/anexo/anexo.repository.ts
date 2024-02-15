import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Anexo } from "./entities/anexo.entity";
import { CreateAnexoDto } from "./dto/create-anexo.dto";

@Injectable()
export class AnexoRepository {
  constructor(
    @Inject("ANEXO_REPOSITORY")
    private repository: Repository<Anexo>
  ) {}

  async create(anexo: CreateAnexoDto) {
    return this.repository.create(anexo);
  }

  async save(anexo: any) {
    return await this.repository.save(anexo);
  }
  async findAll() {
    return await this.repository.find();
  }
  async findOne(id: string) {
    return await this.repository.findOne({ where: { id: id } });
  }
  async remove(anexo: any) {
    return await this.repository.remove(anexo);
  }
}
