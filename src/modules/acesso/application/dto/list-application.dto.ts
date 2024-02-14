import { ListAppGroup_ApplicationDto } from "../../application_group/dto/list-applicantion_gropup_application.dto";

export class ListApplicationDto {
  name: string;
  name_group: ListAppGroup_ApplicationDto[];

  constructor(name, name_group) {
    this.name = name;
    this.name_group = name_group;
  }
}
