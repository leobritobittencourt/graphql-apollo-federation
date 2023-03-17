export class InputCreateUserDto {
  name: string;
  username: string;
  address: string;

  constructor(data?: InputCreateUserDto) {
    this.name = data?.name;
    this.username = data?.username;
    this.address = data?.address;
  }
}

export class OutputCreateUserDto {
  id: string;
  name: string;
  username: string;
  addresses?: OutputUserAddressDto[];
  createdAt: Date;
  updatedAt?: Date | null;

  constructor(data: OutputCreateUserDto) {
    this.id = data.id;
    this.name = data.name;
    this.username = data.username;
    this.addresses = data.addresses;
    this.createdAt = data.createdAt;
    this.updatedAt = data?.updatedAt;
  }
}

class OutputUserAddressDto {
  id: string;
  address: string;

  constructor(data: OutputUserAddressDto) {
    this.id = data.id;
    this.address = data.address;
  }
}
