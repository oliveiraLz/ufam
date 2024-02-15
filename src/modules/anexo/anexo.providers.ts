import { DataSource } from "typeorm";
import { Anexo } from "./entities/anexo.entity";

export const AnexoProviders = [
  {
    provide: "ANEXO_REPOSITORY",
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Anexo),
    inject: ["DATA_SOURCE"],
  },
];
