import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec'
import { app, credential, initializeApp } from 'firebase-admin'
import { env } from '../env'

const file = require('../public/where-cheaper-firebase-adminsdk-ytiv0-16098fc4d0.json')

export const firebaseLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
  if (settings) {
    const firebase: app.App = initializeApp({
      credential: credential.cert(file),
      databaseURL: env.firebase.databaseUrl,
    })
    settings.setData('firebase', firebase)
  }
}
