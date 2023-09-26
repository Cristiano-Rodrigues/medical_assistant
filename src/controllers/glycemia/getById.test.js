import { ServerError } from '../../errors'
import { serverError, success } from '../../helpers'
import { makeSut } from '../../stubs/glycemia/getById'

describe('getGlycemiaById', () => {
  test('Should return server error if something goes wrong', async () => {
    const glycemiaRepository = (conn) => ({
      getById: async () => {
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
      result: {}
    }))
  })
})