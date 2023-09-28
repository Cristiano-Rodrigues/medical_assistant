import { registerMedication } from '../../controllers'
import { auth } from '../../middlewares'
import { medicationRepository } from '../../repositories'
import { wrapController, wrapMiddleware, Connection, jwt } from '../../adapters'
import { validateRegisterMedication } from '../../validators'

export default router => {
  const params = {
    Connection,
    medicationRepository
  }
  const authMiddleware = wrapMiddleware(auth, { jwt })

  router.post(
    '/medication',
    authMiddleware,
    validateRegisterMedication,
    wrapController(registerMedication, params)
  )

  return router
}