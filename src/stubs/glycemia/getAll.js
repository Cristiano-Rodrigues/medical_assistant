import { faker } from '@faker-js/faker'
import { getAllGlycemia } from '../../controllers'

class DefaultConn {
  close () {}
}

const defaultGlycemiaRepository = (conn) => ({
  getAll: async () => ([{}])
})

const req = {
  user: {
    id: faker.number.int()
  }
}

export const makeSut = ({
  Connection = DefaultConn,
  glycemiaRepository = defaultGlycemiaRepository
} = {}) => (
  async () => (
    await getAllGlycemia(req, {
      Connection,
      glycemiaRepository
    })
  )
)