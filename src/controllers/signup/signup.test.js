import { faker } from '@faker-js/faker'
import { Mailer, Hasher, Connection, patientRepository } from '../../tests/stubs'
import { req } from '../../tests/patient'
import { ServerError } from '../../errors'
import { signup } from './signup'
import { duplicatedEntry, invalidEntry, serverError, success } from '../helpers'

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

    expect(response).toEqual(invalidEntry(requiredFields.toString()))
  })

  test('Should return InvalidEntry error if born is invalid', async () => {
    const response = await signup({
      body: {
        ...req.body,
        born: faker.date.future()
      }
    }, {})

    expect(response).toEqual(invalidEntry('born'))
  })

  test('Should return InvalidEntry error if a password < 8 chararters is given', async () => {
    const response = await signup({
      body: {
        ...req.body,
        password: faker.internet.password({ length: 7 })
      }
    }, {})

    expect(response).toEqual(invalidEntry('password'))
  })

  test('Should return DuplicatedEntry error if email already exists', async () => {
    const patientRepository = () => ({
      getByEmail: (email) => ({ email }),
      create: () => {}
    })
    const result = await signup(req, {
      mailer: new Mailer(),
      hasher: new Hasher(),
      connection: new Connection(),
      patientRepository
    })
    
    expect(result).toEqual(duplicatedEntry('email'))
  })

  test('Should call mailer with correct params', async () => {
    class Mailer {
      async send ({ type, to, content }) {
        expect(type).toBe('activation-code')
        expect(typeof content).toBe('number')
        expect(to).toBe(req.body.email)
      }
    }
    await signup(req, {
      mailer: new Mailer(),
      hasher: new Hasher(),
      connection: new Connection(),
      patientRepository
    })
  })

  test('Should call hasher with correct password', async () => {
    class Hasher {
      async hash (password) {
        expect(password).toBe(req.body.password)
      }
    }
    await signup(req, {
      mailer: new Mailer(),
      hasher: new Hasher(),
      connection: new Connection(),
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
      mailer: new Mailer(),
      hasher: new Hasher(),
      connection: new Connection(),
      patientRepository
    })
  })

  test('Should call connection.close function to after using repository', async () => {
    class Connection {
      close () {
        expect(1).toBe(1)
      }
    }
    await signup(req, {
      mailer: new Mailer(),
      hasher: new Hasher(),
      connection: new Connection(),
      patientRepository
    })
  })

  test('Should return server error if an unexpected error occurred', async () => {
    const patientRepository = () => ({
      getByEmail: () => {},
      create: (patient) => {
        throw new ServerError()
      }
    })
    const response = await signup(req, {
      mailer: new Mailer(),
      hasher: new Hasher(),
      connection: new Connection(),
      patientRepository
    })

    expect(response).toEqual(serverError(new ServerError()))
  })

  test('Should return success object if no error', async () => {
    const response = await signup(req, {
      mailer: new Mailer(),
      hasher: new Hasher(),
      connection: new Connection(),
      patientRepository
    })

    expect(response).toEqual(success())
  })
})