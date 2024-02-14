import { DataSource } from "typeorm";
import { ApplicationGroupEntity } from "./entities/application_groups.entity";

export const Application_groupProviders = [
  {
    provide: "APPLICATION_GROUP_REPOSITORY",
    useFactory: (dataSource: DataSource) => dataSource.getRepository(ApplicationGroupEntity),
    inject: ["DATA_SOURCE"],
  },
];
