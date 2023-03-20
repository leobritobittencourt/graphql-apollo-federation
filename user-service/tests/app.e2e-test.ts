import { ApolloServer, BaseContext } from '@apollo/server';
import gql from 'graphql-tag';
import request from 'supertest';
import { MemoryRepositoryFactory } from '../src/infrastructure/factory/memory/repository.factory';
import { GraphQL } from '../src/infrastructure/http/graphql';

async function createApolloServer() {
  const repositoryFactory = new MemoryRepositoryFactory();
  const graphQL = new GraphQL(repositoryFactory);
  return graphQL.listen();
}

describe('App e2e', () => {
  let server: ApolloServer<BaseContext>, url: string;

  beforeAll(async () => {
    ({ server, url } = await createApolloServer());
  });

  afterAll(async () => {
    await server?.stop();
  });

  it('should be able to create a new user', () => {
    // Arrange
    const query = `
      mutation ($name: String!, $username: String!, $address: String) {
        createUser(name: $name, username: $username, address: $address) {
          id
          name
          username
          addresses {
            id
            address
          }
        }
      }
    `;
    const variables = { name: 'Leonardo', username: 'leobritob', address: '123 Street' };
    // Act
    return request(url)
      .post('')
      .send({ query, variables })
      .expect((res: any) => {
        expect(res.body.data.createUser.id).toEqual(expect.any(String));
      });
  });

  it('should be able to return the user list', () => {
    // Arrange
    const query = `
      query {
        findAllUsers {
          id
          name
        }
      }
    `;
    // Act
    return request(url)
      .post('')
      .send({ query })
      .expect((res: any) => {
        expect(res.body.data.findAllUsers.length).toBeGreaterThanOrEqual(1);
      });
  });
});
