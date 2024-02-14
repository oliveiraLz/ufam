import { Body, Controller, Delete, Get, Post, Put, UseGuards } from "@nestjs/common";
import { HttpCode, Param } from "@nestjs/common/decorators";
import { HttpStatus } from "@nestjs/common/enums";
import { ParseUUIDPipe } from "@nestjs/common/pipes";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user-dto";
import { UsersService } from "./user.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "../../../guards/auth.guard";
import { RoleGuard } from "../../../guards/role.guard";
import { Roles } from "../../../decorators/role.decorator";
import { Role } from "../../../enums/role.enum";

@ApiTags("Users")
@ApiBearerAuth()
@UseGuards(AuthGuard, RoleGuard)
@Controller("user")
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Roles(Role.USUARIO_READ)
  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Roles(Role.USUARIO_WRITE)
  @Post()
  async create(@Body() body: CreateUserDto) {
    return await this.usersService.create(body);
  }

  @Roles(Role.USUARIO_READ)
  @Get(":id")
  async findOne(@Param("id", new ParseUUIDPipe()) id: string) {
    return await this.usersService.findOne(id);
  }

  @Roles(Role.USUARIO_WRITE)
  @Put(":id")
  async update(@Param("id", new ParseUUIDPipe()) id: string, @Body() body: UpdateUserDto) {
    return await this.usersService.update(id, body);
  }

  @Roles(Role.USUARIO_DELETE)
  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param("id", new ParseUUIDPipe()) id: string) {
    await this.usersService.delete(id);
  }
}
