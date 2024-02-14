import { ListRoleDto } from '../../role/dto/list-roles.dto';

export class ListFeatureDto {
  id: string;
  name: string;
  description: string;
  roles: ListRoleDto[];

  constructor(id: string, name: string, description: string, roles: any[]) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.roles = roles.map((r) => new ListRoleDto(r.id, r.name));
  }
}
