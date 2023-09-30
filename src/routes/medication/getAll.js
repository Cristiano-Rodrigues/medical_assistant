import { getAllMedication } from '../../controllers'
import { auth } from '../../middlewares'
import { medicationRepository } from '../../repositories'
import { wrapController, wrapMiddleware, Connection, jwt } from '../../adapters'

export default router => {
  const params = {
    Connection,
    medicationRepository
  }
  const authMiddleware = wrapMiddleware(auth, { jwt })

  router.get(
    '/medication',
    authMiddleware,
    wrapController(getAllMedication, params)
  )

  return router
}