import { updatePatient } from '../../controllers'
import { auth } from '../../middlewares'
import { patientRepository } from '../../repositories'
import { wrapController, wrapMiddleware, Connection, hasher, jwt } from '../../adapters'
import { validateUpdatePatient } from '../../validators'

export default router => {
  const params = {
    Connection,
    hasher,
    patientRepository
  }
  const authMiddleware = wrapMiddleware(auth, { jwt })

  router.put(
    '/patient',
    authMiddleware,
    validateUpdatePatient,
    wrapController(updatePatient, params)
  )

  return router
}