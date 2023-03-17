import axios, { AxiosInstance } from 'axios';
import { AWSS3Service } from './aws-s3.service';
import fs from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { readFileSync } from 'node:fs';

export class GraphQLFetcherService {
  constructor(
    private readonly awsS3Service: AWSS3Service = new AWSS3Service(),
    private readonly http: AxiosInstance = axios.create()
  ) {}

  async fetchLatestVersion(): Promise<SchemaRegistryItem> {
    const url = process.env.UPLINK_SERVER;
    const { data } = await this.http.get<SchemaRegistryItem>(url);
    return data;
  }

  async downloadLatestVersion(key: string): Promise<Buffer> {
    const bucketName = process.env.AWS_BUCKET_NAME;
    return this.awsS3Service.getObject(bucketName, key);
  }

  async fetchAndDownloadLatestVersion() {
    try {
      const savedFileName = join(__dirname, 'supergraph.graphql');
      const latestVersion = await this.fetchLatestVersion();
      const file = await this.downloadLatestVersion(latestVersion.FileName);
      await fs.writeFile(savedFileName, file, { encoding: 'utf-8' });
      return file.toString('utf-8');
    } catch (error) {
      console.error('fetchAndDownloadLatestVersion ~ error:', error);
    }
  }

  createManager(params: Partial<CreateManagerParams> = { intervalInMs: 10_000 }) {
    const supergraphSdl = readFileSync(resolve('src', 'supergraph.graphql')).toString();
    return async ({ getDataSource, healthCheck, update }: any) => {
      let timer: NodeJS.Timeout;
      const pool = () => {
        console.log('⏰ Pooling Supergraph updates...');
        timer = setTimeout(async () => {
          try {
            const result = await this.fetchAndDownloadLatestVersion();
            if (result) {
              update(result);
            }
            pool();
          } catch (error) {
            console.error(`Failed to update supergraph: ${error instanceof Error ? error.message : error}`);
          }
        }, params.intervalInMs);
      };
      pool();

      return {
        supergraphSdl,
        cleanup: async () => {
          if (timer) {
            clearTimeout(timer);
          }
        },
      };
    };
  }
}

interface SchemaRegistryItem {
  FileName: string;
  CreatedAt: number;
  IsAvailable: string;
}

interface CreateManagerParams {
  intervalInMs: number;
}
