import { DataSource } from 'typeorm';
import { FeatureEntity } from './entities/feature.entity';

export const FeatureProviders = [
  {
    provide: 'FEATURE_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(FeatureEntity),
    inject: ['DATA_SOURCE'],
  },
];
