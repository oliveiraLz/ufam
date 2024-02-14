import { forwardRef, Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { RolesProviders } from './role.providers';
import { AuthModule } from '../auth/auth.module';
import { UsersService } from '../user/user.service';
import { GroupService } from '../group/group.service';
import { DatabaseModule } from '../../../database/database.module';

@Module({
  imports: [forwardRef(() => AuthModule), DatabaseModule],
  controllers: [RoleController],
  providers: [...RolesProviders, RoleService, UsersService, GroupService],
  exports: [RoleService],
})
export class RoleModule {}
