import { serverError, success } from '../../helpers'

export async function getAllDoctor (req, {
  Connection,
  doctorRepository
}) {
  let connection

  try {
    connection = new Connection()
    const { getAll } = doctorRepository(connection)

    const { id: patientId } = req.user
    const result = await getAll(patientId)

    return success({ result })
  } catch (error) {
    return serverError(error)
  } finally {
    connection.close()
  }
}