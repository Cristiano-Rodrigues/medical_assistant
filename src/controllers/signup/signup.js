import { serverError, success, generateRandomCode, duplicatedEntry } from '../helpers'

export async function signup(req, {
  mailer,
  hasher,
  connection,
  patientRepository
}) {
  try {
    const { create, getByEmail } = patientRepository(connection)

    const alreadyExists = await getByEmail(req.body.email)
    if (alreadyExists) {
      return duplicatedEntry('email')
    }

    const code = generateRandomCode({ min: 100_000, max: 1_000_000 })
    await mailer.send({
      type: 'activation-code',
      to: req.body.email,
      content: code
    })

    await create({
      ...req.body,
      password: hasher.hash(req.body.password),
      code
    })

    connection.close()

    return success()
  } catch (error) {
    return serverError(error)
  }
}