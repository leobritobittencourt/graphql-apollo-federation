import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { ApolloGateway } from '@apollo/gateway';
import * as dotenv from 'dotenv';
import { GraphQLFetcherService } from './infrastructure/service/graphql-fetcher.service';
dotenv.config();

async function main() {
  const graphqlFetcher = new GraphQLFetcherService();
  const gateway = new ApolloGateway({
    supergraphSdl: graphqlFetcher.createManager(),
    uplinkEndpoints: [process.env.UPLINK_SERVER],
  });
  gateway.onSchemaLoadOrUpdate(() => console.log('✅ The Supergraph schema has been successfully updated!'));
  const server = new ApolloServer({ gateway });
  const { url } = await startStandaloneServer(server);
  console.log(`🚀 Gateway server ready at ${url}`);
}

main();
