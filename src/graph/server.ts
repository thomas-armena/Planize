
import { ApolloServer } from 'apollo-server-express'
import firebaseApp from '../lib/firebase'
import logger from '../lib/logging'
import manageResolvers from './manage/resolver'
import manageSchema from './manage/schema'
import rootSchema from './rootSchema'
import todoResolvers from './todo/resolver'
import todoSchema from './todo/schema'
import userResolvers from './user/resolver'
import userSchema from './user/schema'

const apolloServer = new ApolloServer({
  typeDefs: [rootSchema, userSchema, manageSchema, todoSchema],
  resolvers: [userResolvers, manageResolvers, todoResolvers],
  context: async ({ req }) => {
    const tokenId = req?.headers?.authorization ?? ''
    try {
      const decodedToken = await firebaseApp.auth().verifyIdToken(tokenId)
      logger.info(decodedToken)
      const userId = decodedToken?.uid ?? ''
      const email = decodedToken?.email ?? ''
      return {
        userId,
        email
      }
    } catch (error) {
      logger.error("Couldn't verify token", error)
      logger.error(error)
      return {}
    }
  }
})

export default apolloServer
