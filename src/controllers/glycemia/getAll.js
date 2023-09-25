import { serverError, success } from '../../helpers'

export async function getAllGlycemia (req, {
  Connection,
  glycemiaRepository
}) {
  let connection

  try {
    connection = new Connection()
    const { getAll } = glycemiaRepository(connection)

    const result = await getAll()

    return success({ result })
  } catch (error) {
    return serverError(error)
  } finally {
    connection.close()
  }
}