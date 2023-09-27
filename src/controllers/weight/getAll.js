import { serverError, success } from '../../helpers'

export async function getAllWeight (req, {
  Connection,
  weightRepository
}) {
  let connection

  try {
    connection = new Connection()
    const { getAll } = weightRepository(connection)

    const { id: patientId } = req.user
    const result = await getAll(patientId)

    return success({ result })
  } catch (error) {
    return serverError(error)
  } finally {
    connection.close()
  }
}