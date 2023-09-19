import { ServerError } from '../../errors'
import { invalidEntry, serverError, success } from '../helpers'
import { registerGlycemia } from './registerGlycemia'

class Connection {
  close () {}
}

const patientRepository = () => ({
  getById: async () => ({})
})

const glycemiaRepository = () => ({
  register: async () => ({})
})

const req = {
  body: {
    level: 1,
    patientId: 1,
    observation: 'any_observation'
  }
}

describe('registerGlycemia', () => {
  test('Should return error if patientId doesn\'t exist', async () => {
    const patientRepository = () => ({
      getById: async () => null
    })
    const result = await registerGlycemia(req, {
      Connection,
      patientRepository,
      glycemiaRepository
    })
    expect(result).toEqual(invalidEntry('patientId'))
  })

  test('Should return server error in an unexpected error occurs', async () => {
    const patientRepository = () => ({
      getById: async () => { throw new ServerError() }
    })
    const result = await registerGlycemia(req, {
      Connection,
      patientRepository,
      glycemiaRepository
    })
    expect(result).toEqual(serverError(new ServerError()))
  })

  test('Should return success object if no error', async () => {
    const result = await registerGlycemia(req, {
      Connection,
      patientRepository,
      glycemiaRepository
    })
    expect(result).toEqual(success())
  })
})