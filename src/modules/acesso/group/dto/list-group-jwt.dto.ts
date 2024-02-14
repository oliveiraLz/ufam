import { ListRoleJwtDto } from '../../role/dto/list-roles-jwt.dto';

export class ListGroupJwtDto {
  id: string;
  name: string;
  admin: boolean;
  role: ListRoleJwtDto[];

  constructor(id?: string, name?: string, role?: any[], admin?: boolean) {
    this.id = id;
    this.name = name;
    this.admin = admin;
    this.role = role?.map((r) => new ListRoleJwtDto(r.name));
  }
}
