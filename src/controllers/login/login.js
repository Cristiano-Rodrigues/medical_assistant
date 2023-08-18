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
      return {
        code: 400,
        error: new Error('Unauthorized')
      }
    }

    const equals = hasher.compare(user.password, password)
    
    if (!equals) {
      return {
        code: 400,
        error: new Error('Unauthorized')
      }
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
    return {
      code: 500,
      error
    }
  } finally {
    connection.close()
  }
}

function filterUser (user) {
  let output = {}
  const filterFields = [
    'password',
    'created_at',
    'updated_at'
  ]
  Object.keys(user).filter(field => (
    !filterFields.includes(field)
  )).forEach(field => output[field] = user[field])

  return output
}