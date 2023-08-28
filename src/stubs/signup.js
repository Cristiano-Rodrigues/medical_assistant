import { faker } from '@faker-js/faker'
import { signup } from '../controllers'

export const req = {
  body: {
    name: faker.person.fullName(),
    gender: faker.person.sexType(),
    born: faker.date.birthdate(),
    address: faker.location.city(),
    phone: faker.phone.number(),
    email: faker.internet.email(),
    password: faker.internet.password()
  }
}

class DefaulMailer {
  async send () {}
}

class DefaultHasher {
  hash (password) { return password }
}

class DefaultConn {
  close () {}
}

const defaultPatientRepository = () => ({
  create: () => {},
  getByEmail: () => {}
})

export const makeSut = ({
  Mailer = DefaulMailer,
  Hasher = DefaultHasher,
  Connection = DefaultConn,
  patientRepository = defaultPatientRepository
} = {}) => (
  async () => (
    await signup(req, {
      mailer: new Mailer(),
      hasher: new Hasher(),
      Connection,
      patientRepository
    })
  )
)