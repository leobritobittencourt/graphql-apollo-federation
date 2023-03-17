import { ApolloLink, FetchResult, HttpLink, NextLink, Observable, Operation } from '@apollo/client';
import fetch from 'node-fetch';

export class CustomLink extends ApolloLink {
  request(
    operation: Operation,
    forward?: NextLink
  ): Observable<FetchResult<Record<string, any>, Record<string, any>, Record<string, any>>> {
    operation.setContext({
      headers: {
        Authorization: `Bearer <MEU_TOKEN>`,
      },
    });

    const httpLink = new HttpLink({ uri: '', fetch });
    return httpLink.request(operation, forward);
  }
}
