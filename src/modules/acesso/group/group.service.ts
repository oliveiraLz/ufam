import { ConflictException, Inject, Injectable, NotAcceptableException, NotFoundException } from "@nestjs/common";
import { In, Repository } from "typeorm";
import { ListRoleDto } from "../role/dto/list-roles.dto";
import { RoleEntity } from "../role/entities/role.entity";
import { CreateGroupDto } from "./dto/create-group.dto";
import { ListGroupDto } from "./dto/list-group.dto";
import { UpdateGroupDto } from "./dto/update-group-dto";
import { GroupsEntity } from "./entities/group.entity";
import { ListRoleGroupDto } from "../role/dto/list-roles-group.dto";
import { ListFeatureDto } from "../feature/dto/list-feature.dto";
import { ListGroupFeatureDto } from "./dto/list-group-feature.dto";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class GroupService {
  constructor(
    @Inject("GROUP_REPOSITORY")
    private groupsRepository: Repository<GroupsEntity>,
    @Inject("ROLE_REPOSITORY")
    private rolesRepository: Repository<RoleEntity>,
    private readonly authService: AuthService
  ) {}

  async findAll(token: string) {
    const tenant = this.authService.getTenant(token);

    const retorno = await this.groupsRepository.find({
      select: ["id", "name"],
      where: { tenant: { id: tenant } },
      relations: { role: true },
    });

    return retorno.map((r) => new ListGroupDto(r.id, r.name, r.role?.map((g) => new ListRoleGroupDto(g.id, g.name))));
  }

  async findOne(id: string) {
    const group = await this.groupsRepository.findOne({
      select: ["id", "name"],
      where: { id: id },
      relations: {
        role: {
          feature: true,
        },
      },
    });

    if (!group) {
      throw new NotAcceptableException(`Grupo não existe`);
    }

    const features: ListFeatureDto[] = [];

    for (const role of group.role) {
      if (role.feature && features.findIndex((f) => f.id === role.feature.id) === -1) {
        const featureDTO: ListFeatureDto = new ListFeatureDto(
          role.feature.id,
          role.feature.name,
          role.feature.description,
          []
        );
        features.push(featureDTO);
      }
    }

    for (const role of group.role) {
      const indexFeature = features.findIndex((f) => f.id === role.feature.id);

      const roleDTO = new ListRoleDto(role.id, role.name);

      if (indexFeature >= 0) {
        features[indexFeature].roles.push(roleDTO);
      }
    }
    return new ListGroupFeatureDto(group.id, group.name, features);
  }

  async findByGroup(name: string) {
    return await this.groupsRepository.findOne({ where: { name } });
  }

  async create(data: CreateGroupDto, token: string) {
    let role;

    if (data.role) {
      role = await Promise.all(data.role.map((name) => this.preloadRolessEntityByName(name)));
    }

    const tenant = this.authService.getTenant(token);

    const group = this.groupsRepository.create({
      ...data,
      role,
      tenant,
    });

    const buscaGroup = await this.findByGroup(group.name);
    if (buscaGroup) {
      throw new ConflictException("Grupo já cadastrado");
    }
    return await this.groupsRepository.save(group);
  }

  async update(id: string, data: UpdateGroupDto) {
    const role = data.role && (await Promise.all(data.role.map((id) => this.preloadRolessEntityByName(id))));
    const group = await this.groupsRepository.preload({
      id,
      ...data,
      role,
    });
    return await this.groupsRepository.save(group);
  }

  async delete(id: string) {
    const group = await this.groupsRepository.findOne({
      where: { id: id },
    });
    if (!group) {
      throw new NotAcceptableException("Grupo não existe");
    }
    return this.groupsRepository.remove(group);
  }

  private async preloadRolessEntityByName(id: string): Promise<RoleEntity> {
    const roleEntity = await this.rolesRepository.findOne({
      where: { id },
    });
    if (roleEntity) {
      return roleEntity;
    }
    return this.rolesRepository.create({ id });
  }

  async findGroupsAndRelations(groups: GroupsEntity[]): Promise<GroupsEntity[]> {
    const groupNames = groups.map((group) => group.name);

    return await this.groupsRepository.find({
      where: {
        name: In(groupNames),
      },
      relations: {
        role: true,
      },
    });
  }

  async exists(id: string) {
    if (
      !(await this.groupsRepository.findOne({
        where: {
          id,
        },
      }))
    ) {
      throw new NotFoundException(`Grupo ${id} não existe`);
    }
  }
}
