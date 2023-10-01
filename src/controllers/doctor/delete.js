import { serverError, success } from '../../helpers'

export async function deleteDoctor (req, {
  Connection,
  doctorRepository
}) {
  const doctorId = req.params.id
  let connection

  try {
    connection = new Connection()
    const { remove } = doctorRepository(connection)

    const { id: patientId } = req.user
    await remove({
      patientId,
      doctorId
    })

    return success()
  } catch (error) {
    return serverError(error)
  } finally {
    connection.close()
  }
}