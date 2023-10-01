import { duplicatedEntry, serverError, success } from '../../helpers'

export async function registerDoctor (req, {
  Connection,
  doctorRepository
}) {
  const {
    name,
    phone,
    alternativeNumber,
    email
  } = req.body
  let connection

  try {
    connection = new Connection()
    const { getByEmail, register } = doctorRepository(connection)

    const { id: patientId } = req.user
    const exists = await getByEmail({
      patientId,
      email
    })

    if (!!exists) {
      return duplicatedEntry('email')
    }

    await register({
      name,
      phone,
      alternativeNumber,
      email,
      patientId
    })

    return success()
  } catch (error) {
    return serverError(error)
  } finally {
    connection.close()
  }
}