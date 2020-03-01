import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec'
import { app, credential, initializeApp } from 'firebase-admin'
import { env } from '../env'

const file = require('../public/bride-party-firebase-adminsdk-j8zyc-2403acaf6b.json')

export const firebaseLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
  if (settings) {
    const firebase: app.App = initializeApp({
      credential: credential.cert(file),
      databaseURL: env.firebase.databaseUrl,
    })
    settings.setData('firebase', firebase)
  }
}
