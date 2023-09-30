import { getAllMeal } from '../../controllers'
import { auth } from '../../middlewares'
import { mealRepository } from '../../repositories'
import { wrapController, wrapMiddleware, Connection, jwt } from '../../adapters'

export default router => {
  const params = {
    Connection,
    mealRepository
  }
  const authMiddleware = wrapMiddleware(auth, { jwt })

  router.get(
    '/meal',
    authMiddleware,
    wrapController(getAllMeal, params)
  )

  return router
}