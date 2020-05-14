import { ContainerInstance } from 'typedi'
import { Request, Response } from 'express'
import { app } from 'firebase-admin'
import { TheMap } from '../lib/theMap'
import { Guest } from '../api/models'

export interface Context {
    requestId: number
    request: Request
    response: Response
    container: ContainerInstance
    token?: string
    firebase: app.App
    theMap: TheMap
    currentGuest?: Guest
    uid?: string
}

export type ContextWithRequired = Required<Context>
