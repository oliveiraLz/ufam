import { IsEmail, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AuthLoginDto {
  @ApiProperty({ type: String, format: "email" })
  @IsEmail()
  email: string;

  @ApiProperty({ type: String, minLength: 6 })
  @IsString()
  @MinLength(6)
  password: string;
}
