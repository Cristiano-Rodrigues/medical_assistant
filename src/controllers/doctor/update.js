import { invalidEntry, serverError, success } from '../../helpers'

export async function updateDoctor (req, {
  Connection,
  doctorRepository
}) {
  const doctorId = req.params.id
  let connection

  try {
    connection = new Connection()
    const { getById, update } = doctorRepository(connection)

    const { id: patientId } = req.user
    const doctor = await getById({
      patientId,
      doctorId
    })

    if (!doctor) {
      return invalidEntry('id')
    }

    const updatedDoctor = Object.assign({}, doctor, {
      ...req.body
    })

    await update(doctorId, updatedDoctor)

    return success()
  } catch (error) {
    console.log(error)
    return serverError(error)
  } finally {
    connection.close()
  }
}