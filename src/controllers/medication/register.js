import { success, serverError } from '../../helpers'

export async function registerMedication (req, {
  Connection,
  medicationRepository
}) {
  const {
    name,
    dosage,
    observation
  } = req.body
  let connection

  try {
    connection = new Connection()
    const { register } = medicationRepository(connection)

    const patientId = req.user.id
    const date = new Date()

    await register({
      name,
      dosage,
      date,
      observation,
      patientId
    })

    return success()
  } catch (error) {
    return serverError(error)
  } finally {
    connection.close()
  }
}