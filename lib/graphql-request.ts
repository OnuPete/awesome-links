import { GraphQLClient, gql } from "graphql-request";

const API_URL = `/api/graphql`;

export const graphQLClient = new GraphQLClient(API_URL, {
  headers: {
    Authorization: `Bearer ${process.env.API_KEY}`
  }
})
