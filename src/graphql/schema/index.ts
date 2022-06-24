
import { makeExecutableSchema } from '@graphql-tools/schema'
import { resolvers } from '../resolvers'
import typeDefs from './schema.graphqls'

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})
