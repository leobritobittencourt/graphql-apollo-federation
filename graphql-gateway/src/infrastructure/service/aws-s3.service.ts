import * as AWS from 'aws-sdk';

export class AWSS3Service {
  private aws: AWS.S3;

  constructor() {
    const endpoint = process.env.AWS_ENDPOINT;
    const region = process.env.AWS_REGION;

    this.aws = new AWS.S3({ endpoint, region, s3ForcePathStyle: true });
  }

  getObject(bucketName: string, key: string): Promise<Buffer> {
    const Key = this.stripKeyName(key);
    return new Promise((resolve, reject) => {
      this.aws.getObject({ Bucket: bucketName, Key }, (err, data) => {
        if (err) return reject(err);
        return resolve(data.Body as Buffer);
      });
    });
  }

  private stripKeyName(keyName: string) {
    let key = keyName;
    if (key.indexOf('/') === 0) {
      key = key.substring(1, key.length);
    }
    return key;
  }
}
