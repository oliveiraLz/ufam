import { Module } from "@nestjs/common";
import { ApplicationController } from "./application.controller";
import { ApplicationService } from "./application.service";
import { ApplicationProviders } from "./application.providers";
import { DatabaseModule } from "../../../database/database.module";

@Module({
  imports: [DatabaseModule],
  controllers: [ApplicationController],
  providers: [...ApplicationProviders, ApplicationService],
})
export class ApplicationModule {}
