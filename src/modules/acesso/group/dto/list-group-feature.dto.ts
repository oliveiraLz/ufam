import { ListFeatureDto } from '../../feature/dto/list-feature.dto';

export class ListGroupFeatureDto {
  id: string;
  name: string;
  features: ListFeatureDto[];

  constructor(id, name, features) {
    this.id = id;
    this.name = name;
    this.features = features;
  }
}
