import { faker } from '@faker-js/faker'
import { login } from '../../controllers'

export const req = {
  body: {
    email: faker.internet.email(),
    password: faker.internet.password()
  }
}

class DefaultConn {
  close () {}
}

class DefaultHasher {
  compare () { return true }
}

class DefaultJWT {
  generate (payload) { return payload }
}

const defaultPatientRepository = () => ({
  getByEmail: async (email) => ({
    id: 1,
    email,
    password: req.body.password,
    status: 0
  })
})

export const makeSut = ({
  JWT = DefaultJWT,
  Hasher = DefaultHasher,
  Connection = DefaultConn,
  patientRepository = defaultPatientRepository
} = {}) => (
  async () => (
    await login(req, {
      jwt: new JWT(),
      hasher: new Hasher(),
      Connection,
      patientRepository
    })
  )
)