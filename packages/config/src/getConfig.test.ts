import {
  ConfigValueInvalid,
  ConfigValueNotDefined,
  getConfig,
} from './getConfig'

// eslint-disable-next-line no-process-env
process.env.NODE_CONFIG =
  '{"key":"exists","valid-flag":"true","invalid-flag":"bob","invalid-integer":3000}'

describe('get', () => {
  describe('when value exists', () => {
    it('returns value', () => {
      expect.assertions(1)
      expect(getConfig('key')).toBe('exists')
    })
  })

  describe('when value does NOT exist for key', () => {
    it('throws ConfigValueNotDefined error', () => {
      expect.assertions(1)
      expect(() => getConfig('no-key')).toThrow(ConfigValueNotDefined)
    })
  })

  describe('when value is not a string', () => {
    it('throw ConfigValueInvalid error', () => {
      expect.assertions(1)
      expect(() => getConfig('invalid-integer')).toThrow(ConfigValueInvalid)
    })
  })

  describe('validation', () => {
    describe('when value matches regex', () => {
      it('returns value', () => {
        expect.assertions(1)
        expect(getConfig('valid-flag', /^(true|false)$/)).toBe('true')
      })
    })
    describe('when value does NOT match regex', () => {
      it('throws an error', () => {
        expect.assertions(1)
        expect(() => getConfig('invalid-flag', /^(true|false)$/)).toThrow(
          ConfigValueInvalid
        )
      })
    })
  })
})
