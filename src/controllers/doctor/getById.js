import { serverError, success } from '../../helpers'

export async function getDoctorById (req, {
  Connection,
  doctorRepository
}) {
  const doctorId = req.params.id
  let connection

  try {
    connection = new Connection()
    const { getById } = doctorRepository(connection)

    const { id: patientId } = req.user
    const result = await getById({
      patientId,
      doctorId
    })

    return success({ result })
  } catch (error) {
    return serverError(error)
  } finally {
    connection.close()
  }
}