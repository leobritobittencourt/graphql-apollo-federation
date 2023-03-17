import { DynamoDB } from '../infrastructure/service/dynamodb';

interface SchemaRegistryItem {
  FileName: string;
  CreatedAt: number;
  IsAvailable: string;
}

export class GetLatestSupergraphSchemaUseCase {
  dynamodb: DynamoDB;

  constructor() {
    this.dynamodb = new DynamoDB();
  }

  async execute() {
    const items = await this.dynamodb.scan({
      TableName: 'SchemaRegistry',
      ScanIndexForward: false,
    } as any);
    const [latest] = items.sort((a, b) => b.CreatedAt - a.CreatedAt) as SchemaRegistryItem[];
    return latest;
  }
}
