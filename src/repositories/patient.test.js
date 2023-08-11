import { patientRepository } from './patient'
import { connection } from '../adapters/database/mysql'
import { req } from '../tests/patient'

const patient = {
  ...req.body,
  gender: Math.random() > 0.5 ? 'm' : 'f'
}
const { create } = patientRepository(connection)

afterAll(() => {
  connection.close()
})

describe('patientRepository', () => {
  test('Should insert patient in the database', async () => {
    const { insertId } = await create(patient)
    const [ insertPatient ] = await connection.query(`SELECT * FROM patient WHERE id = ?`, [insertId])

    expect(insertPatient).not.toBe(undefined)
  })
})