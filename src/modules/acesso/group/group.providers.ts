import { DataSource } from 'typeorm';
import { GroupsEntity } from './entities/group.entity';
import { RoleEntity } from '../role/entities/role.entity';

export const GroupProviders = [
  {
    provide: 'GROUP_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(GroupsEntity),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'ROLE_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(RoleEntity),
    inject: ['DATA_SOURCE'],
  },
];
