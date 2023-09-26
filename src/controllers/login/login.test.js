import { req, makeSut } from '../../stubs/login/login'
import { serverError, unauthorized } from '../../helpers'
import { ServerError } from '../../errors'

describe('login', () => {
  test('Should return error if user email doesn\'t exist', async () => {
    const patientRepository = () => ({
      getByEmail: () => {}
    })
    const sut = makeSut({ patientRepository })
    const result = await sut()
    
    expect(result).toEqual(unauthorized())
  })

  test('Should return error if passwords are not equal', async () => {
    class Hasher {
      compare () { return false }
    }
    const sut = makeSut({ Hasher })
    const result = await sut()

    expect(result).toEqual(unauthorized())
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
    const sut = makeSut({ JWT })
    await sut()
  })

  test('Should not return user password in the result if success', async () => {
    const sut = makeSut()
    const result = await sut()

    expect(result.user.password).toBe(undefined)
  })

  test('Should return the exception if an exception is thrown', async () => {
    class Hasher {
      compare () {
        throw new ServerError()
      }
    }
    const sut = makeSut({ Hasher })
    const result = await sut()

    expect(result).toEqual(serverError(new ServerError()))
  })

  test('Should call connection.close after finish', async () => {
    class Connection {
      close () {
        expect(1).toBe(1)
      }
    }
    const sut = makeSut({ Connection })
    await sut()
  })

  test('Should return success object if no error', async () => {
    class JWT {
      generate () {
        return 'token'
      }
    }
    const sut = makeSut({ JWT })
    const result = await sut()

    expect(result).toEqual({
      code: 200,
      success: true,
      token: 'token',
      user: {
        id: 1,
        email: req.body.email,
        status: 0
      }
    })
  })
})