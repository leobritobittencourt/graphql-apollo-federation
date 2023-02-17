export class OutputFindAllUsersDto {
  id: string;
  name: string;
  username: string;
  createdAt: Date;
  updatedAt?: Date | null;

  constructor(data: OutputFindAllUsersDto) {
    this.id = data.id;
    this.name = data.name;
    this.username = data.username;
    this.createdAt = data.createdAt;
    this.updatedAt = data?.updatedAt;
  }
}
