import { faker } from '@faker-js/faker'
import { registerGlycemia } from '../controllers'

class DefaultConn {
  close () {}
}

const defaultPatientRepository = () => ({
  getById: async () => ({})
})

const defaultGlycemiaRepository = () => ({
  register: async () => ({})
})

const req = {
  body: {
    level: faker.number.int(),
    observation: faker.lorem.words()
  },
  user: {
    id: faker.number.int()
  }
}

export const makeSut = ({
  Connection = DefaultConn,
  patientRepository = defaultPatientRepository,
  glycemiaRepository = defaultGlycemiaRepository
} = {}) => (
  async () => (
    await registerGlycemia(req, {
      Connection,
      patientRepository,
      glycemiaRepository
    })
  )
)