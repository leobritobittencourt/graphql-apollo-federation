export class OutputFindAllProductsDto {
  id: string;
  name: string;
  price: number;
  createdAt: Date;
  updatedAt?: Date | null;

  constructor(data: OutputFindAllProductsDto) {
    this.id = data.id;
    this.name = data.name;
    this.price = data.price;
    this.createdAt = data.createdAt;
    this.updatedAt = data?.updatedAt;
  }
}
