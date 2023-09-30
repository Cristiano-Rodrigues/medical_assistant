import { getMealById } from '../../controllers'
import { auth } from '../../middlewares'
import { mealRepository } from '../../repositories'
import { wrapController, wrapMiddleware, Connection, jwt } from '../../adapters'
import { validateGetMealById } from '../../validators'

export default router => {
  const params = {
    Connection,
    mealRepository
  }
  const authMiddleware = wrapMiddleware(auth, { jwt })

  router.get(
    '/meal/:id',
    authMiddleware,
    validateGetMealById,
    wrapController(getMealById, params)
  )

  return router
}