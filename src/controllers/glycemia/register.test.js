import { ServerError } from '../../errors'
import { invalidEntry, serverError, success } from '../../helpers'
import { makeSut } from '../../stubs/glycemia/register'

describe('registerGlycemia', () => {
  test('Should return error if patientId doesn\'t exist', async () => {
    const patientRepository = () => ({
      getById: async () => null
    })

    const sut = makeSut({ patientRepository })
    const result = await sut()

    expect(result).toEqual(invalidEntry('patientId'))
  })

  test('Should return server error in an unexpected error occurs', async () => {
    const patientRepository = () => ({
      getById: async () => { throw new ServerError() }
    })

    const sut = makeSut({ patientRepository })
    const result = await sut()

    expect(result).toEqual(serverError(new ServerError()))
  })

  test('Should return success object if no error', async () => {
    const sut = makeSut()
    const result = await sut()

    expect(result).toEqual(success())
  })
})