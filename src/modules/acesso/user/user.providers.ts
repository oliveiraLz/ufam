import { DataSource } from "typeorm";
import { UserEntity } from "./entities/user.entity";
import { GroupsEntity } from "../group/entities/group.entity";
import { RoleEntity } from "../role/entities/role.entity";

export const UsersProviders = [
  {
    provide: "USERS_REPOSITORY",
    useFactory: (dataSource: DataSource) => dataSource.getRepository(UserEntity),
    inject: ["DATA_SOURCE"],
  },
  {
    provide: "GROUP_REPOSITORY",
    useFactory: (dataSource: DataSource) => dataSource.getRepository(GroupsEntity),
    inject: ["DATA_SOURCE"],
  },
  {
    provide: "ROLE_REPOSITORY",
    useFactory: (dataSource: DataSource) => dataSource.getRepository(RoleEntity),
    inject: ["DATA_SOURCE"],
  },
];
