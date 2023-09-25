import { ServerError } from '../../errors'
import { serverError, success } from '../helpers'
import { getAllGlycemia } from './getAll'

class Connection {
  close () {}
}
const glycemiaRepository = (conn) => ({
  getAll: async () => ([{}])
})

describe('getAllGlycemia', () => {
  test('Should return server error if something goes wrong', async () => {
    const glycemiaRepository = (conn) => ({
      getAll: async () => {
        throw new ServerError()
      }
    })
    const result = await getAllGlycemia({}, {
      Connection,
      glycemiaRepository
    })
    expect(result).toEqual(serverError(new ServerError()))
  })

  test('Should return result if no errors', async () => {
    const result = await getAllGlycemia({}, {
      Connection,
      glycemiaRepository
    })
    expect(result).toEqual(success({
      result: [{}]
    }))
  })
})