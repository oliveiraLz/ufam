import { ListRoleDto } from '../../role/dto/list-roles.dto';

export class ListGroupLoginDto {
  id: string;
  name: string;
  permissions: ListRoleDto[];

  constructor(id, name, permissions) {
    this.id = id;
    this.name = name;
    this.permissions = permissions;
  }
}
