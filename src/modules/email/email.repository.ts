import { Inject, Injectable } from "@nestjs/common";
import { IsNull, Repository } from "typeorm";
import { Email } from "./entities/email.entity";

@Injectable()
export class EmailRepository {
  constructor(
    @Inject("EMAIL_REPOSITORY")
    private repository: Repository<Email>
  ) {}

  async create(email: any) {
    return this.repository.create(email);
  }

  async findAllEmailsNaoEnviado() {
    const retorno = await this.repository.find({
      where: {
        enviado: IsNull(),
      },
    });
    return retorno;
  }

  async save(email: any) {
    return await this.repository.save(email);
  }
  async findAll() {
    return await this.repository.find();
  }
  async findOne(id: string) {
    return await this.repository.findOne({ where: { id: id } });
  }
  async remove(email: any) {
    return await this.repository.remove(email);
  }
}
