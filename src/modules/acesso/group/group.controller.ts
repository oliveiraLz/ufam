import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { CreateGroupDto } from "./dto/create-group.dto";
import { UpdateGroupDto } from "./dto/update-group-dto";
import { GroupService } from "./group.service";
import { ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "../../../guards/auth.guard";
import { RoleGuard } from "../../../guards/role.guard";
import { Roles } from "../../../decorators/role.decorator";
import { Role } from "../../../enums/role.enum";

@UseGuards(AuthGuard, RoleGuard)
@Controller("groups")
@ApiTags("Groups")
export class GroupController {
  constructor(private readonly groupsService: GroupService) {}

  @Roles(Role.GRUPO_READ)
  @Get()
  async findAll(@Headers("authorization") token) {
    return await this.groupsService.findAll(token);
  }

  @Roles(Role.GRUPO_WRITE)
  @Post()
  async create(@Body() body: CreateGroupDto, @Headers("authorization") token) {
    return await this.groupsService.create(body, token);
  }

  @Roles(Role.GRUPO_READ)
  @Get(":id")
  async show(@Param("id", new ParseUUIDPipe()) id: string) {
    return await this.groupsService.findOne(id);
  }

  @Roles(Role.GRUPO_WRITE)
  @Put(":id")
  async update(@Param("id", new ParseUUIDPipe()) id: string, @Body() body: UpdateGroupDto) {
    return await this.groupsService.update(id, body);
  }

  @Roles(Role.GRUPO_DELETE)
  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param("id", new ParseUUIDPipe()) id: string) {
    await this.groupsService.delete(id);
  }
}
