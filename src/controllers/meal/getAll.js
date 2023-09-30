import { serverError, success } from '../../helpers'

export async function getAllMeal (req, {
  Connection,
  mealRepository
}) {
  let connection

  try {
    connection = new Connection()
    const { getAll } = mealRepository(connection)

    const { id: patientId } = req.user
    const result = await getAll(patientId)

    return success({ result })
  } catch (error) {
    return serverError(error)
  } finally {
    connection.close()
  }
}