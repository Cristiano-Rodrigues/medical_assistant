import { serverError, success } from '../../helpers'

export async function getWeightById (req, {
  Connection,
  weightRepository
}) {
  const weightId = req.params.id
  let connection

  try {
    connection = new Connection()
    const { getById } = weightRepository(connection)

    const { id: patientId } = req.user
    const result = await getById({
      patientId,
      weightId
    })

    return success({ result })
  } catch (error) {
    return serverError(error)
  } finally {
    connection.close()
  }
}