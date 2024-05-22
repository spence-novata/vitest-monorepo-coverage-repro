import { ConfigValueNotDefined, getConfig } from './getConfig'

type DatabaseConfig = {
  url: string
  name: string
  host: string
  port: number
  user: string
  pass: string
}

const DATABASE_REGEX = /postgresql:\/\/(\S+.):(\S+.)@(\S+.):(\d+.)\/(\S+.)/
enum RegexPartMapper {
  USER = 1,
  PASS = 2,
  HOST = 3,
  PORT = 4,
  NAME = 5,
}

function extractDatabaseConfig(url: string): DatabaseConfig {
  const matches = DATABASE_REGEX.exec(url)
  if (!matches) {
    throw new Error(
      `DATABASE_URL:\`${url}\` must be of the format postgresql://`
    )
  }

  return {
    url,
    name: matches[RegexPartMapper.NAME],
    host: matches[RegexPartMapper.HOST],
    port: parseInt(matches[RegexPartMapper.PORT]),
    user: matches[RegexPartMapper.USER],
    pass: matches[RegexPartMapper.PASS],
  }
}
export function getDatabaseConfig(): DatabaseConfig {
  try {
    const url = getConfig('DATABASE_URL')
    if (url) {
      return extractDatabaseConfig(url)
    }
  } catch (error) {
    if (!(error instanceof ConfigValueNotDefined)) {
      throw error
    }
  }

  const name = getConfig('DATABASE_NAME')
  const host = getConfig('DATABASE_HOST')
  const port = getConfig('DATABASE_PORT')
  const user = getConfig('DATABASE_USER')
  const pass = getConfig('DATABASE_PASS')

  return extractDatabaseConfig(
    `postgresql://${user}:${pass}@${host}:${port}/${name}`
  )
}
