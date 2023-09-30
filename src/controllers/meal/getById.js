import { serverError, success } from '../../helpers'

export async function getMealById (req, {
  Connection,
  mealRepository
}) {
  const mealId = req.params.id
  let connection

  try {
    connection = new Connection()
    const { getById } = mealRepository(connection)
    
    const { id: patientId } = req.user
    const result = await getById({
      patientId,
      mealId
    })

    return success({ result })
  } catch (error) {
    return serverError(error)
  } finally {
    connection.close()
  }
}