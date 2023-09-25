import { filterUser, serverError, unauthorized } from '../../helpers'

export async function login (req, {
  jwt,
  hasher,
  Connection,
  patientRepository
}) {
  const { email, password } = req.body
  let connection

  try {
    connection = new Connection()
    const { getByEmail } = patientRepository(connection)

    const user = await getByEmail(email)
    if (!user) {
      return unauthorized()
    }

    const equals = hasher.compare(password, user.password)
    
    if (!equals) {
      return unauthorized()
    }

    const payload = {
      id: user.id,
      status: user.status,
      email
    }

    const token = jwt.generate(payload)

    return {
      code: 200,
      success: true,
      token,
      user: filterUser(user)
    }
  } catch (error) {
    return serverError(error)
  } finally {
    connection.close()
  }
}