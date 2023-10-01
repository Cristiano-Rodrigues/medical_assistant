import { getAllDoctor } from '../../controllers'
import { auth } from '../../middlewares'
import { doctorRepository } from '../../repositories'
import { wrapController, wrapMiddleware, Connection, jwt } from '../../adapters'

export default router => {
  const params = {
    Connection,
    doctorRepository
  }
  const authMiddleware = wrapMiddleware(auth, { jwt })

  router.get(
    '/doctor',
    authMiddleware,
    wrapController(getAllDoctor, params)
  )

  return router
}