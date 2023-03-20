import { ApolloServer, BaseContext } from '@apollo/server';
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

  async listen(port = 4002): Promise<{ server: ApolloServer<BaseContext>; url: string }> {
    const resolvers = this.getResolvers();
    const server = new ApolloServer({ schema: buildSubgraphSchema({ typeDefs, resolvers }) });
    const { url } = await startStandaloneServer(server, { listen: { port } });
    console.log(`🚀 GraphQL server ready at ${url}`);
    return { server, url };
  }

  private getResolvers() {
    return {
      Mutation: {
        createUser: (root: any, args: any, context: any) => this.userController.create(args),
        updateOneUserById: (root: any, args: any, context: any) => this.userController.updateOneById(args.id, args),
      },
      Query: {
        findAllUsers: () => this.userController.findAll(),
        findOneUserById: (_: any, args: { id: string }) => this.userController.findOneById(args.id),
      },
      User: {
        __resolveReference: async (user: any) => {
          const result = await this.userController.findOneById(user.id);
          return result;
        },
      },
    };
  }
}
