import { login } from './login'
import { req } from '../../tests/patient'
import { Connection, Hasher, JWT } from '../../tests/stubs'

const patientRepository = () => ({
  getByEmail: (email) => ({
    id: 1,
    email,
    password: req.body.password,
    status: 0
  })
})

describe('login', () => {
  test('Should return error if user email doesn\'t exist', async () => {
    const patientRepository = () => ({
      getByEmail: () => {}
    })
    const result = await login(req, {
      jwt: new JWT(),
      hasher: new Hasher(),
      Connection,
      patientRepository
    })
    expect(result).toEqual({
      code: 400,
      error: new Error('Unauthorized')
    })
  })

  test('Should return error if passwords are not equal', async () => {
    class Hasher {
      compare () { return false }
    }
    const result = await login(req, {
      jwt: new JWT(),
      hasher: new Hasher(),
      Connection,
      patientRepository
    })
    expect(result).toEqual({
      code: 400,
      error: new Error('Unauthorized')
    })
  })

  test('Should call jwt.generate with correct params', async () => {
    class JWT {
      generate (payload) {
        expect(payload).toEqual({
          id: 1,
          email: req.body.email,
          status: 0
        })
      }
    }
    await login(req, {
      jwt: new JWT(),
      hasher: new Hasher(),
      Connection,
      patientRepository
    })
  })

  test('Should not return user password in the result if success', async () => {
    const result = await login(req, {
      jwt: new JWT(),
      hasher: new Hasher(),
      Connection,
      patientRepository
    })
    expect(result.user.password).toBe(undefined)
  })

  test('Should return the exception if an exception is thrown', async () => {
    class Hasher {
      compare () {
        throw new Error('Server Error')
      }
    }
    const result = await login(req, {
      jwt: new JWT(),
      hasher: new Hasher(),
      Connection,
      patientRepository
    })
    expect(result).toEqual({
      code: 500,
      error: new Error('Server Error')
    })
  })

  test('Should call connection.close after finish', async () => {
    class Connection {
      close () {
        expect(1).toBe(1)
      }
    }
    await login(req, {
      jwt: new JWT(),
      hasher: new Hasher(),
      Connection,
      patientRepository
    })
  })

  test('Should return success object if no error', async () => {
    class JWT {
      generate () {
        return 'token_string'
      }
    }
    const result = await login(req, {
      jwt: new JWT(),
      hasher: new Hasher(),
      Connection,
      patientRepository
    })
    expect(result).toEqual({
      code: 200,
      success: true,
      token: 'token_string',
      user: {
        id: 1,
        email: req.body.email,
        status: 0
      }
    })
  })
})