import { DataSource } from "typeorm";
import { Parametros } from "./entities/parametro.entity";

export const ParametrosProviders = [
  {
    provide: "PARAMETROS_REPOSITORY",
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Parametros),
    inject: ["DATA_SOURCE"],
  },
];
