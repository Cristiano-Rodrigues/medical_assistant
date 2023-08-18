import { patientRepository } from './patient'
import { Connection } from '../adapters'
import { req } from '../tests/patient'
import { generateRandomCode } from '../controllers/helpers'

const connection = new Connection()
const patient = {
  ...req.body,
  gender: Math.random() > 0.5 ? 'm' : 'f',
  code: generateRandomCode({ min: 100_000, max: 1_000_000 })
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