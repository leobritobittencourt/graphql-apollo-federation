import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { RepositoryFactoryInterface } from '../../../domain/factory/repository.factory';
import { ProductController } from '../../controller/product.controller';
import { HttpInterface } from '../http';
import { typeDefs } from './types';

export class GraphQL implements HttpInterface {
  private readonly productController: ProductController;

  constructor(private readonly repositoryFactory: RepositoryFactoryInterface) {
    this.productController = new ProductController(this.repositoryFactory);
  }

  async listen(port = 4001): Promise<void> {
    const resolvers = this.getResolvers();
    const server = new ApolloServer({ schema: buildSubgraphSchema({ typeDefs, resolvers }) });
    const { url } = await startStandaloneServer(server, { listen: { port } });
    console.log(`🚀 GraphQL server ready at ${url}`);
  }

  private getResolvers() {
    return {
      Mutation: {
        createProduct: (root: any, args: any, context: any) => this.productController.create(args),
      },
      Query: {
        findAllProducts: () => this.productController.findAll(),
        findOneProductById: (args: { productId: string }) => this.productController.findOneById(args.productId),
      },
      Product: {
        __resolveReference: (product: { id: string }) => {
          return this.productController.findOneById(product.id);
        },
      },
    };
  }
}
