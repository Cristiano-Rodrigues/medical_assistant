import { registerMeal } from '../../controllers'
import { auth } from '../../middlewares'
import { mealRepository } from '../../repositories'
import { wrapController, wrapMiddleware, Connection, jwt } from '../../adapters'
import { validateRegisterMeal} from '../../validators'

export default router => {
  const params = {
    Connection,
    mealRepository
  }
  const authMiddleware = wrapMiddleware(auth, { jwt })

  router.post(
    '/meal',
    authMiddleware,
    validateRegisterMeal,
    wrapController(registerMeal, params)
  )

  return router
}