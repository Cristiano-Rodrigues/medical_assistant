import { ServerError } from '../../errors'
import { serverError, success } from '../../helpers'
import { makeSut } from '../../stubs/glycemia/getAll'

describe('getAllGlycemia', () => {
  test('Should return server error if something goes wrong', async () => {
    const glycemiaRepository = (conn) => ({
      getAll: async () => {
        throw new ServerError()
      }
    })
    const sut = makeSut({ glycemiaRepository })
    const result = await sut()

    expect(result).toEqual(serverError(new ServerError()))
  })

  test('Should return result if no errors', async () => {
    const sut = makeSut()
    const result = await sut()
    
    expect(result).toEqual(success({
      result: [{}]
    }))
  })
})