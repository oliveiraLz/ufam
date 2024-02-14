import { DataSource } from "typeorm";
import { Email } from "./entities/email.entity";

export const EmailProviders = [
  {
    provide: "EMAIL_REPOSITORY",
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Email),
    inject: ["DATA_SOURCE"],
  },
];
