import { Resolvers } from '../generated/graphql';
import {
  createLink,
  createUserBookmark,
  link,
  links,
  me,
  users,
} from './resolvers';

export const resolvers: Resolvers = {
  Query: {
    links,
    link,
    me,
    users,
  },
  Mutation: {
    createLink,
    createUserBookmark,
  },
  Link: {
    users: async (parent, _args, ctx) =>
      await ctx.prisma.user.findMany({
        where: { bookmarks: { some: { id: { equals: parent.id } } } },
      }),
  },
  User: {
    bookmarks: async (parent, _args, ctx) =>
      await ctx.prisma.link.findMany({
        where: { users: { some: { id: parent.id } } },
      }),
  },
};
