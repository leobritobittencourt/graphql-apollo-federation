export class OutputFindOneUserByIdDto {
  id: string;
  name: string;
  username: string;
  addresses?: OutputUserAddressDto[];
  createdAt: Date;
  updatedAt?: Date | null;

  constructor(data: OutputFindOneUserByIdDto) {
    this.id = data.id;
    this.name = data.name;
    this.username = data.username;
    this.addresses = data?.addresses ? data.addresses.map((address) => new OutputUserAddressDto(address)) : undefined;
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
