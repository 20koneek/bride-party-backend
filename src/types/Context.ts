import { app } from 'firebase-admin'
import { TheMap } from '../lib/theMap'
import { Guest } from '../api/models'

export interface Context {
    token?: string
    firebase: app.App
    theMap: TheMap
    currentGuest?: Guest
    uid?: string
}

export type ContextWithRequired = Required<Context>
