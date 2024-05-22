import request from 'supertest'

import { app } from './app.ts'
import { SERVICE_PATH_PREFIX } from './pathPrefix'

describe('Hello world', () => {
  it('returns the message', async () => {
    expect.assertions(1)
    const { text } = await request(app).get(SERVICE_PATH_PREFIX)

    await expect(text).toBe('Hello world!')
  })

  it('returns the message 2', async () => {
    expect.assertions(1)
    const { text } = await request(app).get(SERVICE_PATH_PREFIX + '/two')

    await expect(text).toBe('Hello world!')
  })
})
