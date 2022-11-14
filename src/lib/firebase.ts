import admin from 'firebase-admin'
import { applicationDefault } from 'firebase-admin/app'

const firebaseApp = admin.initializeApp({
  credential: applicationDefault()
})

export default firebaseApp
