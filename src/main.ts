import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { envs } from "./common/env-values";
import { Logger } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import * as fs from "fs";

const logger = new Logger("Bootstrap");

async function bootstrap() {
  let app;

  if (process.env.SSL_CONFIG === "true") {
    const httpsOptions = {
      key: fs.readFileSync("/root/privkey.pem"),
      cert: fs.readFileSync("/root/cert.pem"),
    };

    app = await NestFactory.create(AppModule, { httpsOptions });
  } else {
    app = await NestFactory.create(AppModule);
  }

  app.enableCors({ origin: /.*/ });

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle("Balandrau-GILAM")
    .setDescription("Gerenciamento-GILAM")
    .setVersion("1.0.0")
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
      "Bearer"
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  document.security = [{ Bearer: [] }];
  SwaggerModule.setup("api", app, document);

  await app.listen(envs.APP_PORT, () => {
    logger.log(
      `Server running on port: ${envs.APP_PORT} ${process.env.SSL_CONFIG === "true" ? "with SSL" : "without SSL"}...`
    );
  });
}

bootstrap().then(() => {});
