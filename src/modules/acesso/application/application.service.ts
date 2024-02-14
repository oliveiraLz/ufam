import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { ApplicationEntity } from "./entities/application.entity";
import { ListApplicationDto } from "./dto/list-application.dto";
import { ListAppGroup_ApplicationDto } from "../application_group/dto/list-applicantion_gropup_application.dto";

@Injectable()
export class ApplicationService {
  constructor(
    @Inject("APPLICATION_REPOSITORY")
    private applicationRepository: Repository<ApplicationEntity>
  ) {}

  async findAll() {
    const retorno = await this.applicationRepository.find({
      relations: { name_group: true },
    });

    return retorno.map(
      (r) => new ListApplicationDto(r.name, r.name_group?.map((g) => new ListAppGroup_ApplicationDto(g.name)))
    );
  }
}
