import { success, serverError } from '../../helpers'

export async function getExerciseById (req, {
  Connection,
  exerciseRepository
}) {
  const exerciseId = req.params.id
  let connection

  try {
    connection = new Connection()
    const { getById } = exerciseRepository(connection)

    const patientId = req.user.id
    const result = await getById({
      patientId,
      exerciseId
    })

    return success({ result })
  } catch (error) {
    return serverError(error)
  } finally {
    connection.close()
  }
}