import { serverError, success } from '../../helpers'

export async function getAllMedications (req, {
  Connection,
  medicationRepository
}) {
  let connection

  try {
    connection = new Connection()
    const { getAll } = medicationRepository(connection)

    const { id: patientId } = req.user
    const result = await getAll(patientId)

    return success({ result })
  } catch (error) {
    return serverError(error)
  } finally {
    connection.close()
  }
}