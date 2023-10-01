import { deleteMeal } from '../../controllers'
import { auth } from '../../middlewares'
import { mealRepository } from '../../repositories'
import { wrapController, wrapMiddleware, Connection, jwt } from '../../adapters'
import { validateDeleteMeal } from '../../validators'

export default router => {
  const params = {
    Connection,
    mealRepository
  }
  const authMiddleware = wrapMiddleware(auth, { jwt })

  router.delete(
    '/meal/:id',
    authMiddleware,
    validateDeleteMeal,
    wrapController(deleteMeal, params)
  )

  return router
}