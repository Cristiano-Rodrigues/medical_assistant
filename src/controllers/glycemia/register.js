import { serverError, success } from '../../helpers'

export async function registerGlycemia (req, {
  Connection,
  glycemiaRepository
}) {
  const {
    level,
    observation
  } = req.body

  let connection

  try {
    connection = new Connection()
    const { register } = glycemiaRepository(connection)
    
    const { id: patientId } = req.user
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