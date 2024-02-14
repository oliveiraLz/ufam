import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApplicationGroupEntity } from '../../application_group/entities/application_groups.entity';
import { RoleEntity } from '../../role/entities/role.entity';
import { Base } from '../../../../decorators/base.entity';

@Entity({ name: 'feature', schema: 'acesso' })
export class FeatureEntity extends Base {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => RoleEntity, (role) => role.feature, {
    cascade: true,
  })
  roles?: RoleEntity[];

  @ManyToOne(
    () => ApplicationGroupEntity,
    (applicationGroupEntity) => applicationGroupEntity.features,
  )
  @JoinColumn({ name: 'application_group_id', referencedColumnName: 'id' })
  applicationGroup?: ApplicationGroupEntity;
}
