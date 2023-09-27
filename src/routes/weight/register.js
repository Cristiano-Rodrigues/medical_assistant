import { registerWeight } from '../../controllers'
import { auth } from '../../middlewares'
import { weightRepository } from '../../repositories'
import { wrapController, wrapMiddleware, Connection, jwt } from '../../adapters'
import { validateRegisterWeight } from '../../validators'

export default router => {
  const params = {
    Connection,
    weightRepository
  }
  const authMiddleware = wrapMiddleware(auth, { jwt })

  router.post(
    '/weight',
    authMiddleware,
    validateRegisterWeight,
    wrapController(registerWeight, params)
  )

  return router
}