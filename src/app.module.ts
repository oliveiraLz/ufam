import { Module } from "@nestjs/common";
import { AuthModule } from "./modules/acesso/auth/auth.module";
import { ApplicationModule } from "./modules/acesso/application/application.module";
import { ApplicationGroupModule } from "./modules/acesso/application_group/application_group.module";
import { FeatureModule } from "./modules/acesso/feature/feature.module";
import { GroupModule } from "./modules/acesso/group/group.module";
import { TenantModule } from "./modules/acesso/tenant/tenant.module";
import { RoleModule } from "./modules/acesso/role/role.module";
import { UserModule } from "./modules/acesso/user/user.module";
import { ScheduleModule } from "@nestjs/schedule";
import { EmailModule } from "./modules/email/email.module";
import { ParametrosModule } from "./modules/parametros/parametros.module";
import { AnexoModule } from "./modules/anexo/anexo.module";
import { MulterModule } from "@nestjs/platform-express";

@Module({
  imports: [
    ScheduleModule.forRoot(),
    AuthModule,
    ApplicationModule,
    ApplicationGroupModule,
    FeatureModule,
    GroupModule,
    RoleModule,
    TenantModule,
    UserModule,
    EmailModule,
    ParametrosModule,
    AnexoModule,
    MulterModule.register({
      dest: "./uploads", // Diretório onde os arquivos serão salvos
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
