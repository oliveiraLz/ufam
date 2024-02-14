import { Injectable } from "@nestjs/common";
import { EmailRepository } from "./email.repository";
import * as fs from "fs";
import * as nodemailer from "nodemailer";
import * as path from "path";
import multer from "multer";
import { ParametrosRepository } from "../parametros/parametros.repository";
import { CreateEmailDto } from "./dto/create-email.dto";

@Injectable()
export class EmailService {
  constructor(
    private emailRepository: EmailRepository,
    private parametrosRepository: ParametrosRepository
  ) {}

  private transporter: nodemailer.Transporter;

  async create(data: CreateEmailDto) {
    return await this.emailRepository.create(data);
  }

  async save(data: any) {
    return await this.emailRepository.save(data);
  }

  // async queueExist() {
  //   const email_host = await this.parametrosRepository.pegarValor("EMAIL_HOST");
  //   const email_port = await this.parametrosRepository.pegarValor("EMAIL_PORT");
  //   const email_login = await this.parametrosRepository.pegarValor("EMAIL_LOGIN");
  //   const email_passwd = await this.parametrosRepository.pegarValor("EMAIL_PASSWORD");
  //   const email_from = await this.parametrosRepository.pegarValor("EMAIL_FROM");

  //   this.transporter = nodemailer.createTransport({
  //     host: email_host,
  //     port: parseInt(email_port),
  //     secure: true,
  //     auth: {
  //       user: email_login,
  //       pass: email_passwd,
  //     },
  //   });

  //   const fila = await this.emailRepository.findAllEmailsNaoEnviado();
  //   for (const f of fila) {
  //     const mailOptions: nodemailer.SendMailOptions = {
  //       from: email_from,
  //       to: f.destinatario,
  //       subject: f.titulo,
  //       text: f.mensagem,
  //       attachments: [
  //         {
  //           filename: f.arquivoNome,
  //           content: fs.createReadStream(f.arquivo),
  //         },
  //       ],
  //     };

  //     try {
  //       // Enviar e-mail
  //       await this.transporter.sendMail(mailOptions);

  //       // Atualizar a data de envio no objeto de e-mail
  //       f.enviado = new Date();

  //       // Persistir o objeto de e-mail atualizado no banco de dados
  //       await this.emailRepository.save(f);
  //     } catch (error) {
  //       console.log(`Erro ao enviar e-mail ${f.destinatario}.`);
  //     }
  //   }
  // }

  // async sendEmail(emailDto: CreateEmailDto) {
  //   const email_host = await this.parametrosRepository.pegarValor("EMAIL_HOST");
  //   const email_port = await this.parametrosRepository.pegarValor("EMAIL_PORT");
  //   const email_login = await this.parametrosRepository.pegarValor("EMAIL_LOGIN");
  //   const email_passwd = await this.parametrosRepository.pegarValor("EMAIL_PASSWORD");
  //   const email_from = await this.parametrosRepository.pegarValor("EMAIL_FROM");

  //   this.transporter = nodemailer.createTransport({
  //     host: email_host,
  //     port: parseInt(email_port),
  //     secure: true,
  //     auth: {
  //       user: email_login,
  //       pass: email_passwd,
  //     },
  //   });

  //   const mailOptions: nodemailer.SendMailOptions = {
  //     from: email_from,
  //     to: emailDto.destinatario,
  //     subject: emailDto.titulo,
  //     text: emailDto.mensagem,
  //     attachments: [
  //       {
  //         filename: emailDto.arquivoNome,
  //         content: emailDto.arquivo,
  //       },
  //     ],
  //   };

  //   try {
  //     // Enviar e-mail
  //     await this.transporter.sendMail(mailOptions);

  //     // Criar objeto de e-mail com base nos dados do DTO
  //     const newEmail = this.emailRepository.create({
  //       Nome: emailDto.Nome,
  //       cpf: emailDto.cpf,
  //       destinatario: emailDto.destinatario,
  //       mensagem: emailDto.mensagem,
  //       titulo: emailDto.titulo,
  //       tipo: emailDto.tipo,
  //       arquivo: emailDto.arquivo,
  //       arquivoNome: emailDto.arquivoNome,
  //       enviado: new Date(),
  //     });

  //     // Persistir o objeto de e-mail no banco de dados
  //     await this.emailRepository.save(newEmail);
  //   } catch (error) {
  //     console.log(`Erro ao enviar e-mail ${emailDto.destinatario}.`);
  //   }
  // }

  async sendEmail(emailDto: CreateEmailDto, anexo: multer.File): Promise<void> {
    const emailHost = await this.parametrosRepository.pegarValor("EMAIL_HOST");
    const emailPort = await this.parametrosRepository.pegarValor("EMAIL_PORT");
    const emailLogin = await this.parametrosRepository.pegarValor("EMAIL_LOGIN");
    const emailPassword = await this.parametrosRepository.pegarValor("EMAIL_PASSWORD");
    const emailFrom = await this.parametrosRepository.pegarValor("EMAIL_FROM");

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
    const newFilename = originalFilename.replace(/\s/g, "_") + ".pdf";

    // 3. Recuperar a variável de ambiente UPLOAD_PATH
    const uploadPath = process.env.UPLOAD_PATH;

    if (!uploadPath) {
      throw new Error("Variável de ambiente UPLOAD_PATH não definida");
    }

    // 3.b. Construir o caminho completo usando a variável de ambiente
    const filePath = path.join(uploadPath, newFilename);

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

    const mailOptions: nodemailer.SendMailOptions = {
      from: emailFrom,
      to: emailDto.destinatario,
      subject: emailDto.titulo,
      text: emailDto.mensagem,
      attachments: [
        {
          filename: newFilename,
          path: filePath,
        },
      ],
    };

    try {
      // Enviar e-mail
      await this.transporter.sendMail(mailOptions);

      // Criar objeto de e-mail com base nos dados do DTO
      const newEmail = this.emailRepository.create({
        Nome: emailDto.Nome,
        cpf: emailDto.cpf,
        destinatario: emailDto.destinatario,
        mensagem: emailDto.mensagem,
        titulo: emailDto.titulo,
        tipo: emailDto.tipo,
        arquivo: filePath,
        enviado: new Date(),
      });

      // Persistir o objeto de e-mail no banco de dados
      await this.emailRepository.save(newEmail);
    } catch (error) {
      console.log(`Erro ao enviar e-mail ${emailDto.destinatario}: ${error.message}`);
    }
  }
}
