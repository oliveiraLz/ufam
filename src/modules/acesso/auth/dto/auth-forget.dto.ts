import { IsEmail } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AuthForgetDto {
  @ApiProperty({ type: String, format: "email" })
  @IsEmail()
  email: string;
}
