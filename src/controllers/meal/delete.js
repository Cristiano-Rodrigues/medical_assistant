import { serverError, success } from '../../helpers'

export async function deleteMeal (req, {
  Connection,
  mealRepository
}) {
  const mealId = req.params.id
  let connection

  try {
    connection = new Connection()
    const { remove } = mealRepository(connection)

    const { id: patientId } = req.user
    await remove({
      patientId,
      mealId
    })

    return success()
  } catch (error) {
    return serverError(error)
  } finally {
    connection.close()
  }
}