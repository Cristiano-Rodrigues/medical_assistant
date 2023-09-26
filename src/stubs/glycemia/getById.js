import { faker } from '@faker-js/faker'
import { getGlycemiaById } from '../../controllers'

class DefaultConn {
  close () {}
}

const defaultGlycemiaRepository = (conn) => ({
  getById: async () => ({})
})

const req = {
  params: {
    id: faker.number.int()
  },
  user: {
    id: faker.number.int()
  }
}

export const makeSut = ({
  Connection = DefaultConn,
  glycemiaRepository = defaultGlycemiaRepository
} = {}) => (
  async () => (
    await getGlycemiaById(req, {
      Connection,
      glycemiaRepository
    })
  )
)