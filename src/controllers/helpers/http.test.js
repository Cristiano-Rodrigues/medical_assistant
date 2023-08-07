import { InvalidEntry } from '../../errors/invalidEntry'
import { invalidEntry, serverError, success } from './http'

describe('http.js', () => {
  test('invalidEntry should return correct http response', () => {
    expect(invalidEntry('any_field')).toEqual({
      code: 400,
      error: new InvalidEntry('any_field')
    })
  })

  test('serverError should return correct http response', () => {
    expect(serverError()).toEqual({
      code: 500,
      error: new Error('Server Error')
    })
  })

  test('success should return correct http response', () => {
    expect(success()).toEqual({
      code: 200,
      success: true
    })
  })
})