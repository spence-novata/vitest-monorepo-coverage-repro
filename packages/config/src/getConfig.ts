import config from 'config-reloadable'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url) // get the resolved path to the file
const __dirname = path.dirname(__filename) // get the name of the directory
process.env[
  'NODE_CONFIG_DIR'
  // eslint-disable-next-line no-process-cwd/no-process-cwd
] = `${__dirname}/../../../config/:${process.cwd()}/config/`

export class ConfigValueNotDefined extends Error {}
export class ConfigValueInvalid extends Error {}

export function getConfig(
  key: string,
  validationRegex: RegExp | null = null
): string {
  try {
    const value = config().get<string>(key)

    if (typeof value !== 'string') {
      throw new ConfigValueInvalid(
        `Configuration variable '${key}' is not a string.`
      )
    }
    if (validationRegex && !value.match(validationRegex)) {
      throw new ConfigValueInvalid(
        `Configuration variable '${key}' is not in the correct format.\nReceived value failed to match regex '${validationRegex}'`
      )
    }
    return value
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('is not defined')) {
        throw new ConfigValueNotDefined(error.message)
      }
    }
    throw error
  }
}

export function reloadConfig() {
  config.reloadConfigs()
}
