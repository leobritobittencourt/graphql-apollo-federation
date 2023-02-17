import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { RepositoryFactoryInterface } from '../../../domain/factory/repository.factory';
import { ReviewController } from '../../controller/review.controller';
import { HttpInterface } from '../http';
import { typeDefs } from './types';

export class GraphQL implements HttpInterface {
  private readonly reviewController: ReviewController;

  constructor(private readonly repositoryFactory: RepositoryFactoryInterface) {
    this.reviewController = new ReviewController(this.repositoryFactory);
  }

  async listen(port = 4003): Promise<void> {
    const resolvers = this.getResolvers();
    const server = new ApolloServer({ schema: buildSubgraphSchema({ typeDefs, resolvers }) });
    const { url } = await startStandaloneServer(server, { listen: { port } });
    console.log(`🚀 GraphQL server ready at ${url}`);
  }

  private getResolvers() {
    return {
      Mutation: {
        createReview: (root: any, args: any, context: any) => this.reviewController.create(args),
      },
      Query: {
        findAllReviews: () => this.reviewController.findAll(),
        findOneReviewByProductId: (args: any) => this.reviewController.findOneById(args.id),
      },
      Review: {
        product: (review: any) => {
          return { __typename: 'Product', id: review.productId };
        },
        user: (review: any) => {
          return { __typename: 'User', id: review.userId };
        },
        __resolveReference: (review: any) => {
          return this.reviewController.findOneById(review.id);
        },
      },
    };
  }
}
