import { Controller, Get } from "@nestjs/common";
import { ApplicationService } from "./application.service";

@Controller("application")
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Get()
  async finAll() {
    return await this.applicationService.findAll();
  }
}
