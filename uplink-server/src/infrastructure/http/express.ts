import express from 'express';
import { GetLatestSupergraphSchemaUseCase } from '../../application/get-latest-supergraph-schema.use-case';
import { AppController } from '../controller/app.controller';
import { HttpInterface } from './http';

export class ExpressHttp implements HttpInterface {
  app;
  appController: AppController;

  constructor() {
    const getLatestSupergraphSchemaUseCase = new GetLatestSupergraphSchemaUseCase();
    this.appController = new AppController(getLatestSupergraphSchemaUseCase);
    
    this.app = express();
    this.app.use(express.json());
    this.routes();
  }

  async listen(port = 4004): Promise<void> {
    this.app.listen(port, () => console.log(`🚀 Server is running on http://localhost:${port}`));
  }

  routes() {
    this.app.get('/', (req, res, next) => this.appController.getLatestVersion(req, res, next));
  }
}
