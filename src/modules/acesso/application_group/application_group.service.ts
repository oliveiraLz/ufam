import { Inject, Injectable } from "@nestjs/common";
import { ApplicationGroupEntity } from "./entities/application_groups.entity";
import { Repository } from "typeorm";
import { ListApplicationGroupDto } from "./dto/list-application_group.dto";
import { ListFeatureDto } from "../feature/dto/list-feature.dto";

@Injectable()
export class ApplicationGroupService {
  constructor(
    @Inject("APPLICATION_GROUP_REPOSITORY")
    private applicationGroupRepository: Repository<ApplicationGroupEntity>
  ) {}

  async findAll() {
    const retorno = await this.applicationGroupRepository.find({
      relations: ["features", "features.roles"],
    });

    return retorno.map(
      (r) =>
        new ListApplicationGroupDto(
          r.name,
          r.features?.map((g) => new ListFeatureDto(g.id, g.name, g.description, g.roles))
        )
    );
  }
}
