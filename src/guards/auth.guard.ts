import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../modules/acesso/auth/auth.service";
import { UsersService } from "../modules/acesso/user/user.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;
    // Verificar se o cabeçalho de autorização está presente
    if (!authorization) {
      throw new UnauthorizedException("Token de autorização esta ausente na requisição");
    }
    try {
      const data = this.authService.checkToken(authorization.split(" ")[1]);
      request.tokenPayLoad = data;
      // Carregar informações do usuário
      request.user = await this.userService.show(data.id);

      return true;
    } catch (e) {
      return false;
    }
  }
}
