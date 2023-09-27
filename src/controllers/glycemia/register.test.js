import { ServerError } from '../../errors'
import { serverError, success } from '../../helpers'
import { makeSut } from '../../stubs/glycemia/register'

describe('registerGlycemia', () => {
  test('Should return server error in an unexpected error occurs', async () => {
    const glycemiaRepository = () => ({
      register: async () => { throw new ServerError() }
    })

    const sut = makeSut({ glycemiaRepository })
    const result = await sut()

    expect(result).toEqual(serverError(new ServerError()))
  })

  test('Should return success object if no error', async () => {
    const sut = makeSut()
    const result = await sut()

    expect(result).toEqual(success())
  })
})