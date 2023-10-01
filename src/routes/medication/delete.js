import { deleteMedication } from '../../controllers'
import { auth } from '../../middlewares'
import { medicationRepository } from '../../repositories'
import { wrapController, wrapMiddleware, Connection, jwt } from '../../adapters'
import { validateDeleteMedication } from '../../validators'

export default router => {
  const params = {
    Connection,
    medicationRepository
  }
  const authMiddleware = wrapMiddleware(auth, { jwt })

  router.delete(
    '/medication/:id',
    authMiddleware,
    validateDeleteMedication,
    wrapController(deleteMedication, params)
  )

  return router
}