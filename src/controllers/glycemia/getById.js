import { serverError, success } from '../../helpers'

export async function getGlycemiaById (req, {
  Connection,
  glycemiaRepository
}) {
  const glycemiaId = req.params.id
  let connection

  try {
    connection = new Connection()
    const { getById } = await glycemiaRepository(connection)

    const { id: patientId } = req.user
    const result = await getById({
      patientId,
      glycemiaId
    })

    return success({ result })
  } catch (error) {
    return serverError(error)
  } finally {
    connection.close()
  }
}