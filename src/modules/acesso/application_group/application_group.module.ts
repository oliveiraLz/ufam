import { Module } from "@nestjs/common";
import { ApplicationGroupController } from "./application_group.controller";
import { ApplicationGroupService } from "./application_group.service";
import { Application_groupProviders } from "./application_group.providers";
import { DatabaseModule } from "../../../database/database.module";

@Module({
  imports: [DatabaseModule],
  controllers: [ApplicationGroupController],
  providers: [...Application_groupProviders, ApplicationGroupService],
})
export class ApplicationGroupModule {}
