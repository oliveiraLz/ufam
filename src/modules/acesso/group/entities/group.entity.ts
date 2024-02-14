import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { RoleEntity } from '../../role/entities/role.entity';
import { TenantEntity } from '../../tenant/entities/tenant.entity';
import { Base } from '../../../../decorators/base.entity';

@Entity({ name: 'group', schema: 'acesso' })
export class GroupsEntity extends Base {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  admin: boolean;

  @ManyToMany(() => UserEntity, (usersEntity: UserEntity) => usersEntity.groups)
  users: UserEntity[];

  @JoinTable({
    name: 'roles_groups',
    schema: 'acesso',
    joinColumn: {
      name: 'group_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
  })
  @ManyToMany(
    () => RoleEntity,
    (rolesEntity: RoleEntity) => rolesEntity.groups,
    {
      cascade: true,
      nullable: true,
    },
  )
  role: RoleEntity[];

  @ManyToOne(() => TenantEntity, (tenantEntity) => tenantEntity.groups)
  @JoinColumn({ name: 'tenant_id', referencedColumnName: 'id' })
  tenant?: TenantEntity;
}
