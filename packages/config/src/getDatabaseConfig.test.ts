import { getDatabaseConfig } from './getDatabaseConfig'

describe('database', () => {
  it('splits up a DATABASE_URL', () => {
    expect.assertions(1)
    process.env.NODE_CONFIG =
      '{"DATABASE_URL": "postgresql://user:pass@host:5432/name"}'

    expect(getDatabaseConfig()).toMatchObject({
      url: 'postgresql://user:pass@host:5432/name',
      name: 'name',
      host: 'host',
      port: 5432,
      user: 'user',
      pass: 'pass',
    })
  })
  it('combines elements into a DATABASE_URL', () => {
    expect.assertions(1)
    process.env.NODE_CONFIG =
      '{"DATABASE_NAME":"name", "DATABASE_HOST":"host", "DATABASE_PORT":"5432", "DATABASE_USER":"user", "DATABASE_PASS":"pass"}'

    expect(getDatabaseConfig()).toMatchObject({
      url: 'postgresql://user:pass@host:5432/name',
      name: 'name',
      host: 'host',
      port: 5432,
      user: 'user',
      pass: 'pass',
    })
  })
})
