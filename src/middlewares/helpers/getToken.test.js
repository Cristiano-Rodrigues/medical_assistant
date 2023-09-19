import { getToken } from './getToken'

describe('getToken', () => {
  test('Should return null if an invalid argument is given', () => {
    expect(getToken()).toBe(null)
    expect(getToken({})).toBe(null)
  })

  test('Should return null if passed string has wrong format', () => {
    expect(getToken('an_invalid_string_format')).toBe(null)
  })

  test('Should return token if a valid argument is given', () => {
    const token = getToken('Bearer example_token')
    expect(token).toBe('example_token')
  })
})