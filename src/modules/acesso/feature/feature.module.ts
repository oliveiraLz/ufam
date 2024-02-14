import { Module } from '@nestjs/common';
import { FeatureController } from './feature.controller';
import { FeatureService } from './feature.service';
import { FeatureProviders } from './feature.providers';
import { DatabaseModule } from '../../../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [FeatureController],
  providers: [...FeatureProviders, FeatureService],
})
export class FeatureModule {}
