import {
  BOOLEAN_REGEX,
  NUMBER_REGEX,
  PASSWORD_REGEX,
  URL_REGEX,
} from './validation'

describe('validation', () => {
  describe('the BOOLEAN_REGEX', () => {
    it('matches true', () => {
      expect.assertions(1)
      expect(BOOLEAN_REGEX.test('true')).toBeTrue()
    })
    it('matches false', () => {
      expect.assertions(1)
      expect(BOOLEAN_REGEX.test('false')).toBeTrue()
    })
    it('does not match bob', () => {
      expect.assertions(1)
      expect(BOOLEAN_REGEX.test('bob')).toBeFalse()
    })
  })

  describe('the NUMBER_REGEX', () => {
    it('matches 3000', () => {
      expect.assertions(1)
      expect(NUMBER_REGEX.test('3000')).toBeTrue()
    })
    it('does not match bob', () => {
      expect.assertions(1)
      expect(NUMBER_REGEX.test('bob')).toBeFalse()
    })
  })

  describe('the PASSWORD_REGEX', () => {
    it('matches a password', () => {
      expect.assertions(1)
      expect(
        PASSWORD_REGEX.test('a-zA-Z0-9^$£*.[]{}()?"!@#%&/\\,><\':;|_~`=+-')
      ).toBeTrue()
    })
    it('does not match a password with spaces', () => {
      expect.assertions(1)
      expect(PASSWORD_REGEX.test('password 123')).toBeFalse()
    })
    it('does not match a password with special characters', () => {
      expect.assertions(1)
      expect(PASSWORD_REGEX.test('passwörd')).toBeFalse()
    })
  })

  describe('the URL_REGEX', () => {
    it('matches http://example.com', () => {
      expect.assertions(1)
      expect(URL_REGEX.test('http://example.com')).toBeTrue()
    })
    it('does not match example.com', () => {
      expect.assertions(1)
      expect(URL_REGEX.test('example.com')).toBeFalse()
    })
  })
})
