import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Parametros } from "./entities/parametro.entity";
import { UpdateParametrosDto } from "./dto/update-parametro.dto";

@Injectable()
export class ParametrosRepository {
  constructor(
    @Inject("PARAMETROS_REPOSITORY")
    private repository: Repository<Parametros>
  ) {}

  async create(parametros: any) {
    return this.repository.create(parametros);
  }

  async save(parametros: any) {
    return await this.repository.save(parametros);
  }
  async findAll() {
    return await this.repository.find();
  }
  async findOne(chave: string) {
    return await this.repository.findOne({ where: { chave: chave } });
  }
  async update(parametros: any, update: UpdateParametrosDto) {
    return await this.repository.update(parametros, update);
  }
  async remove(parametros: any) {
    return await this.repository.remove(parametros);
  }

  async pegarValor(chave: string) {
    const retorno = await this.repository.findOne({
      select: ["valor"],
      where: { chave },
    });

    return retorno.valor;
  }
}
