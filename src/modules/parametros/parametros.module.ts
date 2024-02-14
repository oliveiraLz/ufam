import { Module } from "@nestjs/common";
import { ParametrosService } from "./parametros.service";
import { ParametrosController } from "./parametros.controller";
import { DatabaseModule } from "src/database/database.module";
import { AuthModule } from "src/modules/acesso/auth/auth.module";
import { ParametrosProviders } from "./parametros.providers";
import { ParametrosRepository } from "./parametros.repository";

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [ParametrosController],
  providers: [...ParametrosProviders, ParametrosService, ParametrosRepository],
  exports: [ParametrosRepository],
})
export class ParametrosModule {}
