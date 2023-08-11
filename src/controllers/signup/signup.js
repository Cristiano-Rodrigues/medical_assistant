import {
  hasNullValue, invalidEntry, serverError, success, generateRandomCode
} from '../helpers'

export async function signup(req, {
  mailer,
  hasher,
  connection,
  patientRepository
}) {
  const requiredFields = [
    'name', 'gender', 'born', 'email', 'password'
  ]

  if (hasNullValue(requiredFields.map(field => req.body[field]))) {
    return invalidEntry(requiredFields.toString())
  }

  const bornDate = new Date(req.body.born)

  if (bornDate.getTime() >= Date.now()) {
    return invalidEntry('born')
  }

  const { password } = req.body
  if (password.length < 8) {
    return invalidEntry('password')
  }

  try {
    const code = generateRandomCode({ min: 100_000, max: 1_000_000 })
    await mailer.send({
      type: 'activation-code',
      to: req.body.email,
      content: code
    })
    const { create } = patientRepository(connection)

    await create({
      ...req.body,
      password: hasher.hash(req.body.password),
      code
    })

    connection.close()

    return success()
  } catch (error) {
    return serverError()
  }
}