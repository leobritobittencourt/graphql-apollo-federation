export class InputCreateProductDto {
  name: string;
  price: number;

  constructor(data?: InputCreateProductDto) {
    this.name = data?.name;
    this.price = data?.price;
  }
}

export class OutputCreateProductDto {
  id: string;
  name: string;
  price: number;
  createdAt: Date;
  updatedAt?: Date | null;

  constructor(data?: OutputCreateProductDto) {
    this.id = data?.id;
    this.name = data?.name;
    this.price = data?.price;
    this.createdAt = data?.createdAt;
    this.updatedAt = data?.updatedAt;
  }
}
