import { serverError, success } from '../../helpers'

export async function deleteMedication (req, {
  Connection,
  medicationRepository
}) {
  const medicationId = req.params.id
  let connection

  try {
    connection = new Connection()
    const { remove } = medicationRepository(connection)

    const { id: patientId } = req.user
    await remove({
      patientId,
      medicationId
    })

    return success()
  } catch (error) {
    return serverError(error)
  } finally {
    connection.close()
  }
}