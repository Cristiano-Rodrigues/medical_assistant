import { serverError, success } from '../../helpers'

export async function getMedicationById (req, {
  Connection,
  medicationRepository
}) {
  const medicationId = req.params.id
  let connection

  try {
    connection = new Connection()
    const { getById } = medicationRepository(connection)

    const { id: patientId } = req.user
    const result = await getById({
      patientId,
      medicationId
    })

    return success({ result })
  } catch (error) {
    return serverError(error)
  } finally {
    connection.close()
  }
}