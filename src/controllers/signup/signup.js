import { InvalidEntry } from '../../errors/invalidEntry'
import { generateRandomCode } from '../helpers/random'

const invalidEntry = field => ({
  code: 400,
  error: new InvalidEntry(field)
})
const hasNullValue = arr => arr.some(value => !value)
const success = () => ({
  code: 200,
  success: true
})
const serverError = () => ({
  code: 500,
  error: new Error('Server Error')
})

export async function signup(req, {
  mailer,
  connection,
  patientRepository
}) {
  const requiredFields = [
    'name', 'gender', 'born', 'address', 'phone', 'email', 'password'
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
      content: code
    })
    const { create } = patientRepository(connection)

    await create({
      ...req.body,
      code
    })

    connection.close()

    return success()
  } catch (error) {
    return serverError()
  }
}