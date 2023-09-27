import { registerGlycemia } from '../../controllers'
import { auth } from '../../middlewares'
import { glycemiaRepository } from '../../repositories'
import { wrapController, wrapMiddleware, Connection, jwt } from '../../adapters'
import { validateRegisterGlycemia } from '../../validators'

export default router => {
  const params = {
    Connection,
    glycemiaRepository
  }
  const authMiddleware = wrapMiddleware(auth, { jwt })

  router.post(
    '/glycemia',
    authMiddleware,
    validateRegisterGlycemia,
    wrapController(registerGlycemia, params)
  )

  return router
}