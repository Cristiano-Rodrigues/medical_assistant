import { updateDoctor } from '../../controllers'
import { auth } from '../../middlewares'
import { doctorRepository } from '../../repositories'
import { wrapController, wrapMiddleware, Connection, jwt } from '../../adapters'
import { validateUpdateDoctor } from '../../validators'

export default router => {
  const params = {
    Connection,
    doctorRepository
  }
  const authMiddleware = wrapMiddleware(auth, { jwt })

  router.put(
    '/doctor/:id',
    authMiddleware,
    validateUpdateDoctor,
    wrapController(updateDoctor, params)
  )

  return router
}