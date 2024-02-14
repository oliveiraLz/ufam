import { IsJWT } from 'class-validator';

export class AuthMegDto {
  @IsJWT()
  token: string;
}
