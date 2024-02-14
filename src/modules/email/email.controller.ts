import { Body, Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { EmailService } from "./email.service";
import { CreateEmailDto } from "./dto/create-email.dto";
import multer from "multer";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("email")
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post("send")
  @UseInterceptors(FileInterceptor("anexo"))
  async sendEmail(@UploadedFile() anexo: multer.File, @Body() emailDto: CreateEmailDto): Promise<void> {
    await this.emailService.sendEmail(emailDto, anexo);
  }
}
