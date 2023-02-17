import { PrismaClient } from '@prisma/client';

export class PrismaService {
  constructor(readonly database = new PrismaClient()) {}
}
