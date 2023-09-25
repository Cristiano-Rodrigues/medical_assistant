import { serverError, success } from '../../helpers'

export async function getAllGlycemia (req, {
  Connection,
  glycemiaRepository
}) {
  let connection

  try {
    connection = new Connection()
    const { getAll } = glycemiaRepository(connection)

    const { id: patientId } = req.user
    const result = await getAll(patientId)

    return success({ result })
  } catch (error) {
    return serverError(error)
  } finally {
    connection.close()
  }
}