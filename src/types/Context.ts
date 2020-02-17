import { ContainerInstance } from 'typedi'
import { Request, Response } from 'express'
// import { User } from '../api/models'
import { app } from 'firebase-admin'

export interface Context {
  requestId: number
  request: Request
  response: Response
  container: ContainerInstance
  token?: string
  firebase: app.App
  // currentUser?: User
}
