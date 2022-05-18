import { MutationResolvers, QueryResolvers } from "../../generated/graphql";

export const links: QueryResolvers["links"] = async (_parent, args, ctx) => {
  let queryResults = null;

  if (args.after) {
    // check if there is a cursor as the argument
    queryResults = await ctx.prisma.link.findMany({
      take: args.first, // the number of items to return from the database
      skip: 1, // skip the cursor
      cursor: {
        id: args.after, // the cursor
      },
    });
  } else {
    // if no cursor, this means that this is the first request
    //  and we will return the first items in the database
    queryResults = await ctx.prisma.link.findMany({
      take: args.first,
    });
  }
  // if the initial request returns links
  if (queryResults.length > 0) {
    // get last element in previous result set
    const lastLinkInResults = queryResults[queryResults.length - 1];
    // cursor we'll return in subsequent requests
    const myCursor = lastLinkInResults.id;

    // query after the cursor to check if we have nextPage
    const secondQueryResults = await ctx.prisma.link.findMany({
      take: args.first,
      cursor: {
        id: myCursor,
      },
      orderBy: {
        id: "asc",
      },
    });
    const result = {
      pageInfo: {
        endCursor: myCursor,
        hasNextPage: secondQueryResults.length >= args.first, //if the number of items requested is greater than the response of the second query, we have another page
      },
      edges: queryResults.map((link) => ({
        cursor: link.id,
        node: link,
      })),
    };

    return result;
  }
  //
  return {
    pageInfo: {
      endCursor: null,
      hasNextPage: false,
    },
    edges: [],
  };
};

export const link: QueryResolvers["link"] = async (_parent, args, ctx) =>
  await ctx.prisma.link.findUnique({
    where: { id: args.id },
    include: { users: true },
  });

export const createLink: MutationResolvers["createLink"] = async (
  _parent,
  args,
  ctx
) => {
  if (!ctx.user) {
    throw new Error(`You need to be logged in to perform an action`);
  }

  const user = await ctx.prisma.user.findUnique({where: {email: ctx.user.email}})
  if(user.role!== 'ADMIN') {
    throw new Error('You do not have permission to perform action')
  }

  const newLink = {
    title: args.title,
    url: args.url,
    imageUrl: args.imageUrl,
    category: args.category,
    description: args.description,
  };

  return await ctx.prisma.link.create({
    data: newLink,
  });
};
