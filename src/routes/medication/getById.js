import { getMedicationById } from '../../controllers'
import { auth } from '../../middlewares'
import { medicationRepository } from '../../repositories'
import { wrapController, wrapMiddleware, Connection, jwt } from '../../adapters'
import { validateGetMedicationById } from '../../validators'

export default router => {
  const params = {
    Connection,
    medicationRepository
  }
  const authMiddleware = wrapMiddleware(auth, { jwt })

  router.get(
    '/medication/:id',
    authMiddleware,
    validateGetMedicationById,
    wrapController(getMedicationById, params)
  )

  return router
}