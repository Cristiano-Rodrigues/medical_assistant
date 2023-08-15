import { patientRepository } from './patient'
import { connection } from '../adapters/database/mysql'
import { req } from '../tests/patient'

const patient = {
  ...req.body,
  gender: Math.random() > 0.5 ? 'm' : 'f'
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
  })
})