import { Injectable } from "@nestjs/common";
import { EmailRepository } from "./email.repository";
import * as fs from "fs";
import * as nodemailer from "nodemailer";
import * as path from "path";
import multer from "multer";
import { ParametrosRepository } from "../parametros/parametros.repository";
import { CreateEmailDto } from "./dto/create-email.dto";
import { AnexoRepository } from "../anexo/anexo.repository";
import { Anexo } from "../anexo/entities/anexo.entity";
import { Email } from "./entities/email.entity";

@Injectable()
export class EmailService {
  constructor(
    private emailRepository: EmailRepository,
    private parametrosRepository: ParametrosRepository,
    private anexoRepository: AnexoRepository
  ) {}

  private transporter: nodemailer.Transporter;

  async create(data: CreateEmailDto) {
    return await this.emailRepository.create(data);
  }

  async save(data: any) {
    return await this.emailRepository.save(data);
  }

  async sendEmail(emailDto: CreateEmailDto, anexo: multer.File): Promise<void> {
    const emailHost = await this.parametrosRepository.pegarValor("EMAIL_HOST");
    const emailPort = await this.parametrosRepository.pegarValor("EMAIL_PORT");
    const emailLogin = await this.parametrosRepository.pegarValor("EMAIL_LOGIN");
    const emailPassword = await this.parametrosRepository.pegarValor("EMAIL_PASSWORD");
    const emailFrom = await this.parametrosRepository.pegarValor("EMAIL_FROM");
    let emailBodyCandidato = await this.parametrosRepository.pegarValor("EMAIL_BODY");
    let emailBodyUfam = await this.parametrosRepository.pegarValor("EMAIL_BODY_UFAM");

    this.transporter = nodemailer.createTransport({
      host: emailHost,
      port: parseInt(emailPort),
      secure: true,
      auth: {
        user: emailLogin,
        pass: emailPassword,
      },
    });

    // 1. Acessar o nome original do arquivo
    const originalFilename = anexo.originalname;

    // 2. Definir o novo nome do arquivo (opcional)
    // const newFilename = originalFilename.replace(/\s/g, "_") + ".pdf";

    // 3. Recuperar a variável de ambiente UPLOAD_PATH
    const uploadPath = process.env.UPLOAD_PATH;

    if (!uploadPath) {
      throw new Error("Variável de ambiente UPLOAD_PATH não definida");
    }

    // 3.b. Construir o caminho completo usando a variável de ambiente
    const filePath = path.join(uploadPath, originalFilename);

    // 4. Verificar e criar a pasta de uploads se necessário
    try {
      await fs.promises.access(uploadPath);
    } catch (error) {
      if (error.code === "ENOENT") {
        await fs.promises.mkdir(uploadPath);
      }
    }

    // 5. Salvar o arquivo na pasta usando async/await
    await fs.promises.writeFile(filePath, anexo.buffer);

    emailBodyUfam = emailBodyUfam
      .replace("##NOME##", emailDto.nome)
      .replace("##CPF##", emailDto.cpf)
      .replace("##MENSAGEM##", emailDto.mensagem)
      .replace("##TIPO##", emailDto.tipo);
    const mailOptions: nodemailer.SendMailOptions = {
      from: emailFrom,
      to: "mauricio.rochaa2004@gmail.com",
      subject: emailDto.titulo,
      html: emailBodyUfam,
      attachments: [
        {
          filename: originalFilename,
          path: filePath,
        },
      ],
    };

    try {
      emailBodyCandidato = emailBodyCandidato
        .replace("##NOME##", emailDto.nome)
        .replace("###NOME###", emailDto.nome)
        .replace("##CPF##", emailDto.cpf)
        .replace("##MENSAGEM##", emailDto.mensagem)
        .replace("##TIPO##", emailDto.tipo);
      await this.transporter.sendMail(mailOptions);
      if (emailDto.copia) {
        const mailOptions2: nodemailer.SendMailOptions = {
          from: emailFrom,
          to: emailDto.destinatario,
          subject: emailDto.titulo,
          html: emailBodyCandidato,
          attachments: [
            {
              filename: originalFilename,
              path: filePath,
            },
          ],
        };

        await this.transporter.sendMail(mailOptions2);
      }

      // Enviar e-mail

      // Criar objeto de e-mail com base nos dados do DTO
      const newEmail = await this.emailRepository.create({
        nome: emailDto.nome,
        cpf: emailDto.cpf,
        destinatario: emailDto.destinatario,
        mensagem: emailDto.mensagem,
        titulo: emailDto.titulo,
        tipo: emailDto.tipo,
        copia: emailDto.copia,
        arquivo: filePath,
        enviado: new Date(),
      });

      // Persistir o objeto de e-mail no banco de dados
      const savedEmail: Email = await this.emailRepository.save(newEmail);

      const newAnexo: Anexo = await this.anexoRepository.create({
        arquivo: filePath,
        arquivo_nome: originalFilename,
        email_id: savedEmail.id,
      });

      await this.anexoRepository.save(newAnexo);
    } catch (error) {
      console.log(`Erro ao enviar e-mail ${emailDto.destinatario}: ${error.message}`);
    }
  }
}
