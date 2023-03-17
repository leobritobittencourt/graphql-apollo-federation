import AWS from 'aws-sdk';

export class DynamoDB {
  dynamodb: AWS.DynamoDB;
  document: AWS.DynamoDB.DocumentClient;

  constructor() {
    const config = { endpoint: 'http://localhost:4566', region: 'us-east-1' };
    this.dynamodb = new AWS.DynamoDB(config);
    this.document = new AWS.DynamoDB.DocumentClient(config);
  }

  async scan(params: AWS.DynamoDB.ScanInput) {
    const data = await this.document.scan(params).promise();
    console.log('🚀 ~ file: dynamodb.ts:15 ~ DynamoDB ~ scan ~ data:', data);
    const items = data.Items;
    return items;
  }
}
