import { InvalidEntry, ServerError } from '../../errors'
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
      error: new ServerError()
    })
  })

  test('success should return correct http response', () => {
    expect(success()).toEqual({
      code: 200,
      success: true
    })
  })
})