import { NextFunction, Request, Response } from 'express';
import { GetLatestSupergraphSchemaUseCase } from '../../application/get-latest-supergraph-schema.use-case';


export class AppController {
  constructor(private readonly getLatestSupergraphSchemaUseCase: GetLatestSupergraphSchemaUseCase) {}

  async getLatestVersion(req: Request, res: Response, next: NextFunction) {
    const data = await this.getLatestSupergraphSchemaUseCase.execute();
    return res.status(200).json(data);
  }
}
