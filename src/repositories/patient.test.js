import { patientRepository } from './patient'
import { connection } from '../adapters/database/mysql'
import { req } from '../tests/patient'
import { generateRandomCode } from '../controllers/helpers'

const patient = {
  ...req.body,
  gender: Math.random() > 0.5 ? 'm' : 'f',
  code: generateRandomCode({ min: 1, max: 10 })
}
const { create, getByEmail } = patientRepository(connection)

afterAll(() => {
  connection.close()
})

describe('patientRepository', () => {
  test('CRUD in patient repository should work', async () => {
    const { insertId } = await create(patient)
    const insertPatient = await getByEmail(patient.email)

    expect(insertPatient).not.toBe(undefined)
    expect(insertPatient.id).toBe(insertId)
    expect(insertPatient.code).toBe(patient.code)
  })
})