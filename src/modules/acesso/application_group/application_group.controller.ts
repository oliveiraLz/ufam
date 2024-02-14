import { Controller, Get } from "@nestjs/common";
import { ApplicationGroupService } from "./application_group.service";

@Controller("application-group")
export class ApplicationGroupController {
  constructor(private readonly applicationGroupService: ApplicationGroupService) {}

  @Get()
  async finAll() {
    return await this.applicationGroupService.findAll();
  }
}
