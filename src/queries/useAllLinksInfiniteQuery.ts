import { GraphQLClient } from 'graphql-request';
import { useInfiniteQuery, UseInfiniteQueryOptions } from 'react-query';
import {
  AllLinksDocument,
  AllLinksQuery,
  AllLinksQueryVariables,
} from './links.graphql';

export function fetcher<TData, TVariables>(
  client: GraphQLClient,
  query: string,
  variables?: TVariables,
  headers?: RequestInit['headers']
) {
  return async ({ pageParam }: { pageParam?: any }): Promise<TData> =>
    client.request<TData, TVariables>(
      query,
      pageParam ? { ...variables, after: pageParam } : variables,
      headers
    );
}

export const useAllLinksInfiniteQuery = <
  TData = AllLinksQuery,
  TError = unknown
>(
  client: GraphQLClient,
  variables?: AllLinksQueryVariables,
  options?: UseInfiniteQueryOptions<AllLinksQuery, TError, TData>,
  headers?: RequestInit['headers']
) => {
  return useInfiniteQuery<AllLinksQuery, TError, TData>(
    variables === undefined
      ? ['AllLinksInfinite']
      : ['AllLinksInfinite', variables],
    fetcher<AllLinksQuery, AllLinksQueryVariables>(
      client,
      AllLinksDocument,
      variables,
      headers
    ),
    options
  );
};
