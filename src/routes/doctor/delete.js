import { deleteDoctor } from '../../controllers'
import { auth } from '../../middlewares'
import { doctorRepository } from '../../repositories'
import { wrapController, wrapMiddleware, Connection, jwt } from '../../adapters'

export default router => {
  const params = {
    Connection,
    doctorRepository
  }
  const authMiddleware = wrapMiddleware(auth, { jwt })

  router.delete(
    '/doctor/:id',
    authMiddleware,
    wrapController(deleteDoctor, params)
  )

  return router
}