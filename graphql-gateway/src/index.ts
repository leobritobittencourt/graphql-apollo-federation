import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { ApolloGateway } from '@apollo/gateway';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

async function main() {
  const supergraphSdl = readFileSync(resolve('src', 'supergraph.graphql')).toString();
  const gateway = new ApolloGateway({ supergraphSdl });
  const server = new ApolloServer({ gateway });
  const { url } = await startStandaloneServer(server);
  console.log(`🚀 Gateway server ready at ${url}`);
}

main();
