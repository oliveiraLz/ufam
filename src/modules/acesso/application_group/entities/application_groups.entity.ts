import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApplicationEntity } from '../../application/entities/application.entity';
import { FeatureEntity } from '../../feature/entities/feature.entity';
import { Base } from '../../../../decorators/base.entity';

@Entity({ name: 'application_group', schema: 'acesso' })
export class ApplicationGroupEntity extends Base {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  name: string;

  @OneToMany(() => FeatureEntity, (feature) => feature.applicationGroup, {
    cascade: true,
  })
  features?: FeatureEntity[];

  @ManyToOne(
    () => ApplicationEntity,
    (applicationEntity) => applicationEntity.name_group,
  )
  @JoinColumn({ name: 'application_id', referencedColumnName: 'id' })
  application?: ApplicationEntity;
}
