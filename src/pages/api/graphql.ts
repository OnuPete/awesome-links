import { ApolloServer } from "apollo-server-micro";
import { resolvers } from "../../../graphql/resolverTypeDefs";
import Cors from 'micro-cors'
import { createContext } from "../../../graphql/context";
import { readFileSync } from "fs";

const cors = Cors()
const typeDefs = readFileSync('./graphql/schema.graphql', 'utf8')

const apolloServer = new ApolloServer({ typeDefs, resolvers, context: createContext })
const startServer = apolloServer.start()

export default cors(async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.end()
    return false
  }

  await startServer
  await apolloServer.createHandler({
    path: '/api/graphql'
  })(req, res);
})


export const config = {
  api: {
    bodyParser: false
  }
}
