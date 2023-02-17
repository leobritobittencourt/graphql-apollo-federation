import { PrismaRepositoryFactory } from './infrastructure/factory/prisma/repository.factory';
import { GraphQL } from './infrastructure/http/graphql';

async function main() {
  const repositoryFactory = new PrismaRepositoryFactory();
  const graphQL = new GraphQL(repositoryFactory);
  await graphQL.listen();
}

main();
