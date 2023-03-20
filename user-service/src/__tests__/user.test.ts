import { gql } from 'graphql-tag';
import { ApolloServer } from '@apollo/server';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { typeDefs as typeDefsDefault } from '../infrastructure/http/graphql/types';
import assert from 'node:assert';
import { InputCreateUserDto } from '../application/dto/create-user.dto';
import { MemoryRepositoryFactory } from '../infrastructure/factory/memory/repository.factory';
import { UserController } from '../infrastructure/controller/user.controller';

interface TestServerParams {
  resolvers?: any;
  typeDefs?: any;
}

function createTestServer({ resolvers, typeDefs = typeDefsDefault }: TestServerParams) {
  const server = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers }),
  });
  return { server };
}

describe('User', () => {
  const repositoryFactory = new MemoryRepositoryFactory();
  const userController = new UserController(repositoryFactory);
  const { server } = createTestServer({
    resolvers: {
      Mutation: {
        createUser: (_: any, args: any) => userController.create(args),
        updateOneUserById: (_: any, args: any) => userController.updateOneById(args.id, args),
      },
      Query: {
        findAllUsers: () => userController.findAll(),
        findOneUserById: (_: any, args: any) => userController.findOneById(args.id),
      },
    },
  });

  it('should be able to create a new user', async () => {
    // Arrange
    const query = gql`
      mutation ($name: String!, $username: String!, $address: String) {
        createUser(name: $name, username: $username, address: $address) {
          id
        }
      }
    `;
    const variables: InputCreateUserDto = {
      name: 'Leonardo',
      username: 'leobritob',
      address: '123 Street',
    };
    interface OperationResult {
      createUser: { id: string };
    }
    // Act
    const result = await server.executeOperation<OperationResult>({ query, variables });
    // Assert
    assert(result.body.kind === 'single');
    expect(result.body.singleResult.data?.createUser.id).toBeDefined();
    expect(result.body.singleResult.data?.createUser.id).toEqual(expect.any(String));
  });

  it('should be able to find all users', async () => {
    // Arrange
    const query = gql`
      query FindAllUsers {
        findAllUsers {
          name
        }
      }
    `;
    interface OperationResult {
      findAllUsers: { name: string }[];
    }
    // Act
    const data = await server.executeOperation<OperationResult>({ query });
    // Assert
    assert(data.body.kind === 'single');
    expect(data.body.singleResult.data?.findAllUsers).toEqual([{ name: 'Leonardo' }]);
  });

  it('should be able to find one user by id', async () => {
    // Arrange
    const allUsers = await server.executeOperation<{ findAllUsers: { id: string; name: string }[] }>({
      query: gql`
        query {
          findAllUsers {
            id
            name
          }
        }
      `,
    });
    const user: any = allUsers.body.kind === 'single' ? allUsers.body.singleResult.data.findAllUsers[0] : {};
    const query = gql`
      query FindOneUserById($id: String!) {
        findOneUserById(id: $id) {
          id
          name
        }
      }
    `;
    const variables = { id: user.id };
    interface OperationResult {
      findOneUserById: { id: string; name: string };
    }
    // Act
    const data = await server.executeOperation<OperationResult>({ query, variables });
    // Assert
    assert(data.body.kind === 'single');
    expect(data.body.singleResult.data?.findOneUserById.id).toEqual(user.id);
    expect(data.body.singleResult.data?.findOneUserById.name).toEqual(user.name);
  });

  it('should be able to update an user by id', async () => {
    // Arrange
    const allUsers = await server.executeOperation<{ findAllUsers: { id: string; name: string }[] }>({
      query: gql`
        query {
          findAllUsers {
            id
            name
          }
        }
      `,
    });
    const user: any = allUsers.body.kind === 'single' ? allUsers.body.singleResult.data.findAllUsers[0] : {};
    const query = gql`
      mutation UpdateOneUserById($id: String!, $name: String) {
        updateOneUserById(id: $id, name: $name) {
          id
          name
        }
      }
    `;
    const variables = { id: user.id, name: 'Leo (changed)' };
    interface OperationResult {
      updateOneUserById: { id: string; name: string };
    }
    // Act
    const data = await server.executeOperation<OperationResult>({ query, variables });
    // Assert
    assert(data.body.kind === 'single');
    expect(data.body.singleResult.data?.updateOneUserById.id).toEqual(user.id);
    expect(data.body.singleResult.data?.updateOneUserById.name).toEqual(variables.name);
  });
});
