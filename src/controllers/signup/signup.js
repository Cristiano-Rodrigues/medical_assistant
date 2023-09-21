import { serverError, success, generateRandomCode, duplicatedEntry } from '../helpers'

export async function signup (req, {
  Connection,
  mailer,
  hasher,
  patientRepository
}) {
  let connection

  try {
    connection = new Connection()
    const { create, getByEmail } = patientRepository(connection)

    const alreadyExists = await getByEmail(req.body.email)
    if (alreadyExists) {
      return duplicatedEntry('email')
    }

    const code = generateRandomCode({ min: 100_000, max: 1_000_000 })

    await create({
      ...req.body,
      password: hasher.hash(req.body.password),
      code
    })
    
    await mailer.send({
      to: req.body.email,
      subject: 'Activation code',
      text: `Your activation code is ${code}`
    })

    return success()
  } catch (error) {
    return serverError(error)
  } finally {
    connection.close()
  }
}