import { registerDoctor } from '../../controllers'
import { auth } from '../../middlewares'
import { doctorRepository } from '../../repositories'
import { wrapController, wrapMiddleware, Connection, jwt } from '../../adapters'
import { validateRegisterDoctor } from '../../validators'

export default router => {
  const params = {
    Connection,
    doctorRepository
  }
  const authMiddleware = wrapMiddleware(auth, { jwt })

  router.post(
    '/doctor',
    authMiddleware,
    validateRegisterDoctor,
    wrapController(registerDoctor, params)
  )

  return router
}