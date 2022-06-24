import { MutationResolvers, QueryResolvers } from '../../generated/graphql';

export const me: QueryResolvers['me'] = async (_parent, _args, ctx) =>
  await ctx.prisma.user.findUnique({ where: { email: ctx.user.email } });

export const users: QueryResolvers['users'] = async (_parent, _args, ctx) =>
  await ctx.prisma.user.findMany();

export const user: QueryResolvers['user'] = async (_parent, args, ctx) =>
  await ctx.prisma.user.findUnique({ where: { id: args.id } });

export const createUserBookmark: MutationResolvers['createUserBookmark'] =
  async (_parent, args, ctx) => {
    if (!ctx.user) {
      throw new Error(`You need to be logged in to perform an action`);
    }

    return await ctx.prisma.user.update({
      where: { email: ctx.user.email },
      data: { bookmarks: { connect: [{ id: args.linkId }] } },
    });
  };
