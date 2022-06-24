/* 955550590082da0e362e70e15687323e8bbc4351
 * This file is automatically generated by graphql-let. */

import * as Types from "graphql-let/__generated__/__types__";
import { UseQueryOptions } from 'react-query';
export declare type AllLinksQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']>;
  after?: Types.InputMaybe<Types.Scalars['String']>;
}>;
export declare type AllLinksQuery = {
  __typename?: 'Query';
  links?: {
    __typename?: 'Response';
    pageInfo?: {
      __typename?: 'PageInfo';
      endCursor?: string | null;
      hasNextPage?: boolean | null;
    } | null;
    edges?: Array<{
      __typename?: 'Edge';
      cursor?: string | null;
      node?: {
        __typename?: 'Link';
        id?: string | null;
        imageUrl?: string | null;
        url?: string | null;
        title?: string | null;
        category?: string | null;
        description?: string | null;
      } | null;
    } | null> | null;
  } | null;
};
export declare const AllLinksDocument = "\n    query AllLinks($first: Int, $after: String) {\n  links(first: $first, after: $after) {\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n    edges {\n      cursor\n      node {\n        id\n        imageUrl\n        url\n        title\n        category\n        description\n        id\n      }\n    }\n  }\n}\n    ";
export declare const useAllLinksQuery: <TData = AllLinksQuery, TError = unknown>(dataSource: {
  endpoint: string;
  fetchParams?: RequestInit;
}, variables?: AllLinksQueryVariables, options?: UseQueryOptions<AllLinksQuery, TError, TData, import("react-query").QueryKey>) => import("react-query").UseQueryResult<TData, TError>;