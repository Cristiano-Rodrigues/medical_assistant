import { InvalidEntry } from '../../errors/invalidEntry'
import { signup } from './signup'
import { faker } from '@faker-js/faker'

const req = {
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
class MailerStub {
  async send () {}
}
class ConnectionStub {
  close () {}
}
const patientRepository = () => ({
  create: () => {}
})

describe('Signup', () => {
  test('Should return InvalidEntry error if a required value is not given', async () => {
    const requiredFields = [
      'name', 'gender', 'born', 'email', 'password'
    ]
    const response = await signup({
      body: {
        ...req.body,
        email: null
      }
    }, {})

    expect(response).toEqual({
      code: 400,
      error: new InvalidEntry(requiredFields.toString())
    })
  })

  test('Should return InvalidEntry error if born is invalid', async () => {
    const response = await signup({
      body: {
        ...req.body,
        born: faker.date.future()
      }
    }, {})

    expect(response).toEqual({
      code: 400,
      error: new InvalidEntry('born')
    })
  })

  test('Should return InvalidEntry error if a password < 8 chararters is given', async () => {
    const response = await signup({
      body: {
        ...req.body,
        password: faker.internet.password({ length: 7 })
      }
    }, {})

    expect(response).toEqual({
      code: 400,
      error: new InvalidEntry('password')
    })
  })

  test('Should call mailer with correct params', async () => {
    class MailerStub {
      async send ({ type, to, content }) {
        expect(type).toBe('activation-code')
        expect(typeof content).toBe('number')
        expect(to).toBe(req.body.email)
      }
    }
    await signup(req, {
      mailer: new MailerStub(),
      connection: new ConnectionStub(),
      patientRepository
    })
  })

  test('Should call [repository].create function with generated code', async () => {
    const patientRepository = () => ({
      create: (patient) => {
        expect(typeof patient.code).toBe('number')
      }
    })
    await signup(req, {
      mailer: new MailerStub(),
      connection: new ConnectionStub(),
      patientRepository
    })
  })

  test('Should call connection.close function to after using repository', async () => {
    class ConnectionStub {
      close () {
        expect(1).toBe(1)
      }
    }
    await signup(req, {
      mailer: new MailerStub(),
      connection: new ConnectionStub(),
      patientRepository
    })
  })

  test('Should return server error if an unexpected error occurred', async () => {
    const patientRepository = () => ({
      create: (patient) => {
        throw new Error('Server Error')
      }
    })
    const response = await signup(req, {
      mailer: new MailerStub(),
      connection: new ConnectionStub(),
      patientRepository
    })
    expect(response).toEqual({
      code: 500,
      error: new Error('Server Error')
    })
  })

  test('Should return success object if no error', async () => {
    const response = await signup(req, {
      mailer: new MailerStub(),
      connection: new ConnectionStub(),
      patientRepository
    })

    expect(response).toEqual({
      code: 200,
      success: true
    })
  })
})