
import { ApolloServer } from 'apollo-server-express'
import manageResolvers from './manage/resolver'
import manageSchema from './manage/schema'
import rootSchema from './rootSchema'
import userResolvers from './user/resolver'
import userSchema from './user/schema'

const apolloServer = new ApolloServer({
  typeDefs: [rootSchema, userSchema, manageSchema],
  resolvers: [userResolvers, manageResolvers]
})

export default apolloServer
