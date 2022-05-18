import { QueryResolvers, Resolvers, UserResolvers } from "../../generated/graphql";

export const UsersQuery: QueryResolvers['users'] = async (_parent, _args, ctx) => await ctx.prisma.user.findMany()

export const UserQuery: QueryResolvers['user'] = async (_parent, args, ctx) => await ctx.prisma.user.findUnique({ where: {id: args.id}})
