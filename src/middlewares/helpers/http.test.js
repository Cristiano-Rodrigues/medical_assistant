import { Unauthorized } from '../../errors'
import { HttpStatusCodes, success, unauthorized } from './http'

describe('http.js', () => {
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