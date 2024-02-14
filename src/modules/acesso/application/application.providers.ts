import { DataSource } from "typeorm";
import { ApplicationEntity } from "./entities/application.entity";

export const ApplicationProviders = [
  {
    provide: "APPLICATION_REPOSITORY",
    useFactory: (dataSource: DataSource) => dataSource.getRepository(ApplicationEntity),
    inject: ["DATA_SOURCE"],
  },
];
