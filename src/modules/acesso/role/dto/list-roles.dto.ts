export class ListRoleDto {
  id: string;
  short: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.short = name.split('_')[name.split('_').length - 1];
  }
}
