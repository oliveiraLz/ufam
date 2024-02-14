import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthRegisterDto } from "./dto/auth-register.dto";
import * as bcrypt from "bcrypt";
import { UsersService } from "../user/user.service";
import { RoleService } from "../role/role.service";
import { UserEntity } from "../user/entities/user.entity";
import { ListGroupJwtDto } from "../group/dto/list-group-jwt.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
    private readonly roleService: RoleService
  ) {}

  async createToken(user: UserEntity) {
    const groups = user.groups?.map((g) => new ListGroupJwtDto(g.id, g.name, g.role, g.admin));

    let roles = [];
    if (groups.some((e) => e.admin)) {
      const listRoles = await this.roleService.findAll();

      roles = listRoles.map((r) => r.name);
    } else {
      roles = groups.flatMap((g) => g.role.map((r) => r.name));
    }

    const tenantList = user.groups?.map((g) => g.tenant);

    return {
      accessToken: this.jwtService.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
          roles: [...new Set(roles)],
          tenant: tenantList.length > 0 && tenantList[0] != undefined ? tenantList[0].id : "",
        },
        //TODO: VERIFICAR ISSUER E AUDIENCE AO SER EMITIDO UM NOVO TOKEN
        {
          expiresIn: "7 days",
          subject: String(user.id),
          issuer: "login",
          audience: "access",
        }
      ),
    };
  }

  checkToken(token: string) {
    try {
      return this.jwtService.verify(token, {
        audience: "access",
        issuer: "login",
      });
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  isValidToken(token: string) {
    try {
      this.checkToken(token);
      return true;
    } catch (e) {
      return false;
    }
  }

  getTenant(token: string) {
    const payload = this.jwtService.decode(token.split(" ")[1]);

    return payload["tenant"];
  }

  async login(email: string, password: string) {
    const user = await this.userService.getUserAuth(email);

    if (!user) {
      throw new UnauthorizedException("Email e/ou senha incorretos.");
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException("Email e/ou senha incorretos.");
    }

    return this.createToken(user);
  }

  async forget(email: string) {
    const user = await this.userService.getUserAuthByEmail(email);
    if (!user) {
      throw new UnauthorizedException("Email não encontrado");
    }

    this.jwtService.sign(
      {
        id: user.id,
      },
      {
        expiresIn: "30 minutes",
        subject: String(user.id),
        issuer: "forget",
        audience: "users",
      }
    );

    return true;
  }

  async reset(password: string, token: string) {
    try {
      const data: any = this.jwtService.verify(token, {
        issuer: "forget",
        audience: "users",
      });

      if (isNaN(Number(data.id))) {
        throw new BadRequestException("Token é inválido");
      }
      const salt = await bcrypt.genSalt();
      password = await bcrypt.hash(password, salt);
      await this.userService.updateAuth(data, password);

      const user = await this.userService.show(String(data.id));

      return this.createToken(user);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async register(data: AuthRegisterDto) {
    const user = await this.userService.create(data);
    return this.createToken(user);
  }
}
