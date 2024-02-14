import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateParametrosDto } from "./dto/create-parametro.dto";
import { ParametrosRepository } from "./parametros.repository";
import { ReturnParametrosDto } from "./dto/return-parametro.dto";
import { UpdateParametrosDto } from "./dto/update-parametro.dto";

@Injectable()
export class ParametrosService {
  constructor(private parametrosRepository: ParametrosRepository) {}

  async create(data: CreateParametrosDto) {
    return await this.parametrosRepository.create(data);
  }

  async findAll() {
    const lista = await this.parametrosRepository.findAll();
    return lista.map((p) => new ReturnParametrosDto(p));
  }

  async findOne(id: string) {
    const parametros = await this.parametrosRepository.findOne(id);
    if (!parametros) {
      throw new NotFoundException("Parametros não encontrados");
    }
    return new ReturnParametrosDto(parametros);
  }

  async update(id: string, update: UpdateParametrosDto) {
    const parametros = await this.parametrosRepository.findOne(id);
    if (!parametros) {
      throw new NotFoundException("Parametros não encontrados");
    }
    return await this.parametrosRepository.update(parametros, update);
  }

  async remove(id: string) {
    const parametros = await this.parametrosRepository.findOne(id);
    if (!parametros) {
      throw new NotFoundException("Parametros não encontrados");
    }
    return await this.parametrosRepository.remove(parametros);
  }
}
