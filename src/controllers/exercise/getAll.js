import { serverError, success } from '../../helpers'

export async function getAllExercise (req, {
  Connection,
  exerciseRepository
}) {
  let connection

  try {
    connection = new Connection()
    const { getAll } = exerciseRepository(connection)

    const { id: patientId } = req.user
    const result = await getAll(patientId)

    return success({ result })
  } catch (error) {
    return serverError(error)
  } finally {
    connection.close()
  }
}