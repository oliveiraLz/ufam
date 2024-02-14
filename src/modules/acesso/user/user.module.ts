import { forwardRef, Module } from "@nestjs/common";
import { UsersService } from "./user.service";
import { UserController } from "./user.controller";
import { UsersProviders } from "./user.providers";
import { AuthModule } from "../auth/auth.module";
import { GroupService } from "../group/group.service";
import { RoleService } from "../role/role.service";
import { DatabaseModule } from "../../../database/database.module";

@Module({
  imports: [DatabaseModule, forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [...UsersProviders, UsersService, GroupService, RoleService],
  exports: [UsersService],
})
export class UserModule {}
