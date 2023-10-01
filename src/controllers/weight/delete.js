import { serverError, success } from '../../helpers'

export async function deleteWeight (req, {
  Connection,
  weightRepository
}) {
  const weightId = req.params.id
  let connection

  try {
    connection = new Connection()
    const { remove } = weightRepository(connection)

    const { id: patientId } = req.user
    await remove({
      patientId,
      weightId
    })

    return success()
  } catch (error) {
    return serverError(error)
  } finally {
    connection.close()
  }
}