import { serverError, success } from '../../helpers'

export async function deleteGlycemia (req, {
  Connection,
  glycemiaRepository
}) {
  const glycemiaId = req.params.id
  let connection

  try {
    connection = new Connection()
    const { remove } = glycemiaRepository(connection)

    const { id: patientId } = req.user
    await remove({
      patientId,
      glycemiaId
    })

    return success()
  } catch (error) {
    return serverError(error)
  } finally {
    connection.close()
  }
}