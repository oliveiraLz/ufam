import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AuthProviders } from "./auth.providers";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { DatabaseModule } from "../../../database/database.module";
import { envs } from "../../../common/env-values";
import { UserModule } from "../user/user.module";
import { RoleModule } from "../role/role.module";
import { GroupModule } from "../group/group.module";

@Module({
  imports: [
    DatabaseModule,
    PassportModule,
    UserModule,
    RoleModule,
    GroupModule,
    JwtModule.register({
      secret: String(envs.JWT_SECRET),
    }),
  ],
  controllers: [AuthController],
  providers: [...AuthProviders, AuthService, JwtStrategy],
  exports: [AuthService, UserModule, RoleModule, GroupModule],
})
export class AuthModule {}
