import { serverError, success } from '../../helpers'

export async function getGlycemiaById (req, {
  Connection,
  glycemiaRepository
}) {
  const id = req.params.id
  let connection

  try {
    connection = new Connection()
    const { getById } = await glycemiaRepository(connection)

    const result = await getById(id)

    return success({ result })
  } catch (error) {
    return serverError(error)
  } finally {
    connection.close()
  }
}