import { serverError, success } from '../../helpers'

export async function registerMeal (req, {
  Connection,
  mealRepository
}) {
  const {
    meal,
    calories,
    observation
  } = req.body
  let connection

  try {
    connection = new Connection()
    const { register } = mealRepository(connection)

    const { id: patientId } = req.user
    const date = new Date()

    await register({
      meal,
      calories,
      date,
      observation,
      patientId
    })

    return success()
  } catch (error) {
    return serverError()
  } finally {
    connection.close()
  }
}