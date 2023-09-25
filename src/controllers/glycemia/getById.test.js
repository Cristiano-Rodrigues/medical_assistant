import { ServerError } from '../../errors'
import { serverError, success } from '../helpers'
import { getGlycemiaById } from './getById'

class Connection {
  close () {}
}
const glycemiaRepository = (conn) => ({
  getById: async () => ({})
})
const req = {
  params: {
    id: 1
  }
}

describe('getGlycemiaById', () => {
  test('Should return server error if something goes wrong', async () => {
    const glycemiaRepository = (conn) => ({
      getById: async () => {
        throw new ServerError()
      }
    })
    const result = await getGlycemiaById(req, {
      Connection,
      glycemiaRepository
    })
    expect(result).toEqual(serverError(new ServerError()))
  })

  test('Should return result if no errors', async () => {
    const result = await getGlycemiaById(req, {
      Connection,
      glycemiaRepository
    })
    expect(result).toEqual(success({
      result: {}
    }))
  })
})