import { invalidEntry, serverError, success } from '../../helpers'

export async function registerGlycemia (req, {
  Connection,
  patientRepository,
  glycemiaRepository
}) {
  const {
    level,
    observation
  } = req.body

  let connection

  try {
    connection = new Connection()
    const { getById } = patientRepository(connection)

    const { id: patientId } = req.user
    const patient = await getById(patientId)
    if (!patient) {
      return invalidEntry('patientId')
    }

    const { register } = glycemiaRepository(connection)
    const date = new Date()

    await register({
      level,
      patientId,
      date,
      observation
    })

    return success()
  } catch (error) {
    return serverError(error)
  } finally {
    connection.close()
  }
}