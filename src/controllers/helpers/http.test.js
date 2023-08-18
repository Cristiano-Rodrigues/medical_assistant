import { DuplicatedEntry, InvalidEntry, ServerError, Unauthorized } from '../../errors'
import { HttpStatusCodes, duplicatedEntry, invalidEntry, serverError, success, unauthorized } from './http'

describe('http.js', () => {
  test('invalidEntry should return correct http response', () => {
    expect(invalidEntry('any_field')).toEqual({
      code: HttpStatusCodes.BadRequest,
      error: new InvalidEntry('any_field')
    })
  })

  test('serverError should return correct http response', () => {
    expect(serverError(new ServerError())).toEqual({
      code: HttpStatusCodes.ServerError,
      error: new ServerError()
    })
  })

  test('duplicatedEntry should return correct http response', () => {
    expect(duplicatedEntry('field')).toEqual({
      code: HttpStatusCodes.BadRequest,
      error: new DuplicatedEntry('field')
    })
  })

  test('unauthorized should return correct http response', () => {
    expect(unauthorized()).toEqual({
      code: HttpStatusCodes.Unauthorized,
      error: new Unauthorized()
    })
  })

  test('success should return correct http response', () => {
    expect(success()).toEqual({
      code: HttpStatusCodes.Ok,
      success: true
    })
  })
})