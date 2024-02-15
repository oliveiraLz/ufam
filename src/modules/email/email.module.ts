import { Module } from "@nestjs/common";
import { EmailService } from "./email.service";
import { EmailController } from "./email.controller";
import { DatabaseModule } from "src/database/database.module";
import { AuthModule } from "../acesso/auth/auth.module";
import { EmailRepository } from "./email.repository";
import { EmailProviders } from "./email.providers";
import { ParametrosModule } from "../parametros/parametros.module";
import { AnexoModule } from "../anexo/anexo.module";

@Module({
  imports: [DatabaseModule, AuthModule, ParametrosModule, AnexoModule],
  controllers: [EmailController],
  providers: [...EmailProviders, EmailService, EmailRepository],
  exports: [EmailRepository],
})
export class EmailModule {}
