import { ConflictException, Inject, Injectable, NotAcceptableException } from "@nestjs/common";
import { Repository } from "typeorm";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { RoleEntity } from "./entities/role.entity";

@Injectable()
export class RoleService {
  constructor(
    @Inject("ROLE_REPOSITORY")
    private roleRepository: Repository<RoleEntity>
  ) {}

  async findAll() {
    return await this.roleRepository.find({
      select: ["id", "name"],
    });
  }

  findOne(id: string) {
    const role = this.roleRepository.findOne({
      where: { id: id },
    });
    if (!role) {
      throw new NotAcceptableException("Regra não existe");
    }
    return role;
  }

  async findByPermission(name: string) {
    return await this.roleRepository.findOne({
      where: { name },
    });
  }

  async create(data: CreateRoleDto) {
    const permission = this.roleRepository.create(data);

    const buscaPermission = await this.findByPermission(permission.name);
    if (buscaPermission) {
      throw new ConflictException("Regra já cadastrada!");
    }

    return await this.roleRepository.save(permission);
  }

  async update(id: string, data: UpdateRoleDto) {
    const permission = await this.findOne(id);
    this.roleRepository.merge(permission, data);
    return await this.roleRepository.save(permission);
  }

  async delete(id: string) {
    const permission = await this.roleRepository.findOne({
      where: { id: id },
    });
    if (!permission) {
      throw new NotAcceptableException("Regra não existe");
    }
    return this.roleRepository.remove(permission);
  }
}
