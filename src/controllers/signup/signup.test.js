import { req, makeSut } from '../../stubs/signup'
import { ServerError } from '../../errors'
import { duplicatedEntry, serverError, success } from '../../helpers'

describe('Signup', () => {
  test('Should return DuplicatedEntry error if email already exists', async () => {
    const patientRepository = () => ({
      getByEmail: (email) => ({ email }),
      create: () => {}
    })
    const sut = makeSut({ patientRepository })
    const result = await sut()
    
    expect(result).toEqual(duplicatedEntry('email'))
  })

  test('Should call mailer with correct params', async () => {
    class Mailer {
      async send ({ type, to, content }) {
        expect(type).toBe('activation-code')
        expect(typeof content).toBe('number')
        expect(to).toBe(req.body.email)
      }
    }
    const sut = makeSut({ Mailer })
    await sut()
  })

  test('Should call hasher with correct password', async () => {
    class Hasher {
      async hash (password) {
        expect(password).toBe(req.body.password)
      }
    }
    const sut = makeSut({ Hasher })
    await sut()
  })

  test('Should call [repository].create function with generated code', async () => {
    const patientRepository = () => ({
      create: (patient) => {
        expect(typeof patient.code).toBe('number')
      }
    })
    const sut = makeSut({ patientRepository })
    await sut()
  })

  test('Should call connection.close function to after using repository', async () => {
    class Connection {
      close () {
        expect(1).toBe(1)
      }
    }
    const sut = makeSut({ Connection })
    await sut()
  })

  test('Should return server error if an unexpected error occurred', async () => {
    const patientRepository = () => ({
      getByEmail: () => {},
      create: () => {
        throw new ServerError()
      }
    })
    const sut = makeSut({ patientRepository })
    const response = await sut()

    expect(response).toEqual(serverError(new ServerError()))
  })

  test('Should return success object if no error', async () => {
    const sut = makeSut()
    const response = await sut()

    expect(response).toEqual(success())
  })
})