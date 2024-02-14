import { Inject, Injectable } from '@nestjs/common';
import { FeatureEntity } from './entities/feature.entity';
import { Repository } from 'typeorm';
import { ListFeatureDto } from './dto/list-feature.dto';
import { ListRoleDto } from '../role/dto/list-roles.dto';

@Injectable()
export class FeatureService {
  constructor(
    @Inject('FEATURE_REPOSITORY')
    private featureRepository: Repository<FeatureEntity>,
  ) {}

  async findAll() {
    const retorno = await this.featureRepository.find({
      select: ['id', 'name'],
      relations: { roles: true },
    });

    return retorno.map(
      (r) =>
        new ListFeatureDto(
          r.id,
          r.name,
          r.description,
          r.roles?.map((g) => new ListRoleDto(g.id, g.name)),
        ),
    );
  }
}
