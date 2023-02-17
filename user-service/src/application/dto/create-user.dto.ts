export class InputCreateUserDto {
  name: string;
  username: string;

  constructor(data?: InputCreateUserDto) {
    this.name = data?.name;
    this.username = data?.username;
  }
}

export class OutputCreateUserDto {
  id: string;
  name: string;
  username: string;
  createdAt: Date;
  updatedAt?: Date | null;

  constructor(data: OutputCreateUserDto) {
    this.id = data.id;
    this.name = data.name;
    this.username = data.username;
    this.createdAt = data.createdAt;
    this.updatedAt = data?.updatedAt;
  }
}
