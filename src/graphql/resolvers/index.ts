import { Resolvers } from "../../generated/graphql";
import { link, links, createLink } from './links';

export const resolvers: Resolvers = {
  Query: {
    links,
    link
  },
  Mutation: {
    createLink
  }
}
