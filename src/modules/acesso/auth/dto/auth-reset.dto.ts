import { IsJWT, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AuthResetDto {
  @ApiProperty({ type: String, minLength: 6 })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ type: String, format: "JWT" })
  @IsJWT()
  token: string;
}
