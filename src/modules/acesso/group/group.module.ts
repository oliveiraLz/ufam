import { forwardRef, Module } from '@nestjs/common';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { GroupProviders } from './group.providers';
import { AuthModule } from '../auth/auth.module';
import { DatabaseModule } from '../../../database/database.module';

@Module({
  imports: [DatabaseModule, forwardRef(() => AuthModule)],
  controllers: [GroupController],
  providers: [...GroupProviders, GroupService],
  exports: [GroupService],
})
export class GroupModule {}
