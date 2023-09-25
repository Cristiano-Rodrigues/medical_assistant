import { Unauthorized } from '../../errors'
import { success, unauthorized } from '../../helpers'
import { auth } from './jwtAuth'


const req = {
  headers: {
    authorization: 'Bearer a_valid_token'
  }
}
const jwt = {
  verify: (token) => ({
    token
  })
}

describe('auth', () => {
  test('Should return unauthorized error if an invalid authorization header is given', () => {
    const req = {
      headers: {
        authorization: null
      }
    }
    const response = auth(req, { jwt })

    expect(response).toEqual(unauthorized())
  })

  test('Should return unauthorized error if an invalid token is given', () => {
    const jwt = {
      verify () { return null }
    }
    const response = auth(req, { jwt })

    expect(response).toEqual(unauthorized())
  })

  test('Should return unauthorized if an error occurs', () => {
    const jwt = {
      verify () { throw new Unauthorized() }
    }
    const response = auth(req, { jwt })

    expect(response).toEqual(unauthorized())
  })

  test('Should put user data into req object if payload is decoded', () => {
    auth(req, { jwt })

    expect(req.user).toEqual({
      token: 'a_valid_token'
    })
  })

  test('Should return success if user authenticates successfuly', () => {
    const response = auth(req, { jwt })

    expect(response).toEqual(success())
  })
})