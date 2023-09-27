import { serverError, success } from '../../helpers'

export async function registerExercise (req, {
  Connection,
  exerciseRepository
}) {
  const {
    type,
    duration,
    observation
  } = req.body
  let connection

  try {
    connection = new Connection()
    const { register } = exerciseRepository(connection)

    const { id: patientId } = req.user
    const date = new Date()

    await register({
      type,
      date,
      duration,
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