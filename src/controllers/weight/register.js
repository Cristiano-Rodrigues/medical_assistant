import { serverError, success } from '../../helpers'

export async function registerWeight (req, {
  Connection,
  weightRepository
}) {
  const {
    weight,
    height,
    observation
  } = req.body
  let connection

  try {
    connection = new Connection()
    const { register } = weightRepository(connection)

    const { id: patientId } = req.user
    const date = new Date()

    await register({
      weight,
      height,
      date,
      observation,
      patientId
    })

    return success()
  } catch (error) {
    console.log(error)
    return serverError(error)
  } finally {
    connection.close()
  }
}