import { Module } from "@nestjs/common";
import { AnexoService } from "./anexo.service";
import { AnexoController } from "./anexo.controller";
import { DatabaseModule } from "src/database/database.module";
import { AuthModule } from "../acesso/auth/auth.module";
import { AnexoRepository } from "./anexo.repository";
import { AnexoProviders } from "./anexo.providers";

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [AnexoController],
  providers: [...AnexoProviders, AnexoService, AnexoRepository],
  exports: [AnexoRepository],
})
export class AnexoModule {}
