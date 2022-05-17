import { Resolvers } from "../generated/graphql";
import { link, links, createLink } from './resolvers';

export const resolvers: Resolvers = {
  Query: {
    links,
    link
  },
  Mutation: {
    createLink
  }
  // Link: {
  //   users: async (parent, _args, ctx) => await ctx.prisma.user.findMany({where: {id: parent}})
  // },
  // User: {
  //   bookmarks: async (parent, _args, ctx) => await ctx.prisma.link.findMany({where: {id:{in:parent}}})
  // }
}
