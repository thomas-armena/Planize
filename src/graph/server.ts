
import { ApolloServer } from 'apollo-server-express'
import firebaseApp from '../lib/firebase'
import manageResolvers from './manage/resolver'
import manageSchema from './manage/schema'
import rootSchema from './rootSchema'
import userResolvers from './user/resolver'
import userSchema from './user/schema'

const apolloServer = new ApolloServer({
  typeDefs: [rootSchema, userSchema, manageSchema],
  resolvers: [userResolvers, manageResolvers],
  context: async ({ req }) => {
    const tokenId = req?.headers?.authorization ?? ''
    try {
      const decodedToken = await firebaseApp.auth().verifyIdToken(tokenId)
      const userId = decodedToken?.uid ?? ''
      const email = decodedToken?.email ?? ''
      return {
        userId,
        email
      }
    } catch (error) {
      return {}
    }
  }
})

export default apolloServer
