import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FeatureEntity } from '../../feature/entities/feature.entity';
import { GroupsEntity } from '../../group/entities/group.entity';
import { Base } from '../../../../decorators/base.entity';

@Entity({ name: 'role', schema: 'acesso' })
export class RoleEntity extends Base {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(
    () => GroupsEntity,
    (groupEntity: GroupsEntity) => groupEntity.role,
  )
  groups: GroupsEntity[];

  @ManyToOne(() => FeatureEntity, (feature) => feature.roles)
  @JoinColumn({ name: 'feature_id', referencedColumnName: 'id' })
  feature?: FeatureEntity;
}
