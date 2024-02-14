import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthForgetDto } from "./dto/auth-forget.dto";
import { AuthLoginDto } from "./dto/auth-login.dto";
import { AuthRegisterDto } from "./dto/auth-register.dto";
import { AuthResetDto } from "./dto/auth-reset.dto";
import { ApiTags, ApiBody, ApiResponse } from "@nestjs/swagger";
import { AuthGuard } from "../../../guards/auth.guard";
import { User } from "../../../decorators/user.decorator";

@Controller("auth")
@ApiTags("Autenticação")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @ApiBody({ type: AuthLoginDto })
  @ApiResponse({ status: 200, description: "Login realizado com sucesso." })
  async login(@Body() { email, password }: AuthLoginDto) {
    return this.authService.login(email, password);
  }

  @Post("register")
  @ApiBody({ type: AuthRegisterDto })
  @ApiResponse({ status: 201, description: "Usuário registrado com sucesso." })
  async register(@Body() body: AuthRegisterDto) {
    return this.authService.register(body);
  }

  @Post("forget")
  @ApiBody({ type: AuthForgetDto })
  @ApiResponse({ status: 200, description: "Email de redefinição de senha enviado com sucesso." })
  async forget(@Body() { email }: AuthForgetDto) {
    return this.authService.forget(email);
  }

  @Post("reset")
  @ApiBody({ type: AuthResetDto })
  @ApiResponse({ status: 200, description: "Senha redefinida com sucesso." })
  async reset(@Body() { password, token }: AuthResetDto) {
    return this.authService.reset(password, token);
  }

  @UseGuards(AuthGuard)
  @Post("me")
  @ApiResponse({ status: 200, description: "Detalhes do usuário obtidos com sucesso." })
  async me(@User() user) {
    const { id, name, email } = user;
    return { user: { id, name, email } };
  }
}
