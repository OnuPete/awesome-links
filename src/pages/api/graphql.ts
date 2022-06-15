import { ApolloServer } from 'apollo-server-micro';
// import { ApolloLogPlugin } from '../../../graphql/utils/logger';
import stringify from 'fast-safe-stringify';
import { readFileSync } from 'fs';
import Cors from 'micro-cors';
import { createContext } from '../../../graphql/context';
import { resolvers } from '../../../graphql/resolverTypeDefs';

const cors = Cors();
const typeDefs = readFileSync('./graphql/schema.graphql', 'utf8');
const myPlugin = {
  // Fires whenever a GraphQL request is received from a client.
  async requestDidStart(requestContext) {
    console.log('Request started!');
    console.log('Query:\n' + requestContext.request.query);
    console.log('Variables:\n' + stringify(requestContext.request.variables));

    return {
      // Fires whenever Apollo Server will parse a GraphQL
      // request to create its associated document AST.
      async parsingDidStart(requestContext) {
        console.log('Parsing started!');
      },

      // Fires whenever Apollo Server will validate a
      // request's document AST against your GraphQL schema.
      async validationDidStart(requestContext) {
        console.log('Validation started!');
      },
      async didEncounterErrors(requestContext) {
        console.log(
          'an error happened in response to query ' +
            requestContext.request.query
        );
        console.log(requestContext.errors);
      },
    };
  },
  async willSendResponse(requestContext) {
    console.log('response sent', requestContext.response);
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: createContext,
  // plugins: [ApolloLogPlugin({})],
  plugins: [myPlugin],
});
const startServer = apolloServer.start();

export default cors(async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.end();
    return false;
  }

  await startServer;
  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res);
});

export const config = {
  api: {
    bodyParser: false,
  },
};
