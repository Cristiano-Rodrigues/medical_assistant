import { ServerError } from '../../errors'
import { serverError, success } from '../helpers'
import { getAll } from './getAll'

class Connection {
  close () {}
}
const glycemiaRepository = (conn) => ({
  getAll: async () => ([{}])
})

describe('getAll', () => {
  test('Should return server error if something goes wrong', async () => {
    const glycemiaRepository = (conn) => ({
      getAll: async () => {
        throw new ServerError()
      }
    })
    const result = await getAll({}, {
      Connection,
      glycemiaRepository
    })
    expect(result).toEqual(serverError(new ServerError()))
  })

  test('Should return result if no errors', async () => {
    const result = await getAll({}, {
      Connection,
      glycemiaRepository
    })
    expect(result).toEqual(success({
      result: [{}]
    }))
  })
})