import express from 'express'
import helmet from 'helmet'

import { message } from './message'
import { SERVICE_PATH_PREFIX } from './pathPrefix'

export const app = express()

app.use(helmet())

app.get(`${SERVICE_PATH_PREFIX}/`, async (req, res) => {
  try {
    res.status(200).set({ 'Content-Type': 'text/html' }).end(message)
  } catch (error) {
    res.status(500).end(error instanceof Error ? error.message : 'Error')
  }
})

app.get(`${SERVICE_PATH_PREFIX}/two`, async (req, res) => {
  try {
    res.status(200).set({ 'Content-Type': 'text/html' }).end(message)
  } catch (error) {
    res.status(500).end(error instanceof Error ? error.message : 'Error')
  }
})
