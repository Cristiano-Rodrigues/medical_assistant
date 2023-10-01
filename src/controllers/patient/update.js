import { invalidEntry, serverError, success } from '../../helpers'

export async function updatePatient (req, {
  Connection,
  patientRepository,
  hasher
}) {
  let connection

  try {
    connection = new Connection()
    const { getById, update } = patientRepository(connection)

    const { id: patientId } = req.user
    const patient = await getById(patientId)

    if (!patient) {
      return invalidEntry('id')
    }

    const updatedPatient = Object.assign({}, patient, {
      ...req.body
    })

    await update(patientId, updatedPatient)

    return success()
  } catch (error) {
    return serverError(error)
  } finally {
    connection.close()
  }
}