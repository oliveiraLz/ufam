import { DataSource } from 'typeorm';
import { RoleEntity } from './entities/role.entity';
import { UserEntity } from '../user/entities/user.entity';
import { GroupsEntity } from '../group/entities/group.entity';

export const RolesProviders = [
  {
    provide: 'ROLE_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(RoleEntity),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'USERS_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(UserEntity),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'GROUP_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(GroupsEntity),
    inject: ['DATA_SOURCE'],
  },
];
