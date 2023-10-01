import { serverError, success } from '../../helpers'

export async function deleteExercise (req, {
  Connection,
  exerciseRepository
}) {
  const exerciseId = req.params.id
  let connection

  try {
    connection = new Connection()
    const { remove } = exerciseRepository(connection)

    const { id: patientId } = req.user
    await remove({
      patientId,
      exerciseId
    })

    return success()
  } catch (error) {
    return serverError(error)
  } finally {
    connection.close()
  }
}