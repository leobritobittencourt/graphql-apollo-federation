import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { RepositoryFactoryInterface } from '../../../domain/factory/repository.factory';
import { UserController } from '../../controller/user.controller';
import { HttpInterface } from '../http';
import { typeDefs } from './types';

export class GraphQL implements HttpInterface {
  private readonly userController: UserController;

  constructor(private readonly repositoryFactory: RepositoryFactoryInterface) {
    this.userController = new UserController(this.repositoryFactory);
  }

  async listen(port = 4002): Promise<void> {
    const resolvers = this.getResolvers();
    const server = new ApolloServer({ schema: buildSubgraphSchema({ typeDefs, resolvers }) });
    const { url } = await startStandaloneServer(server, { listen: { port } });
    console.log(`🚀 GraphQL server ready at ${url}`);
  }

  private getResolvers() {
    return {
      Mutation: {
        createUser: (root: any, args: any, context: any) => this.userController.create(args),
      },
      Query: {
        findAllUsers: () => this.userController.findAll(),
      },
      User: {
        __resolveReference: async (user: any) => {
          const result = await this.userController.findOneById(user.id);
          console.log('🚀 ~ file: index.ts:33 ~ GraphQL ~ __resolveReference: ~ user', user);
          console.log('🚀 ~ file: index.ts:34 ~ GraphQL ~ __resolveReference: ~ result', result);
          return result;
        },
      },
    };
  }
}
