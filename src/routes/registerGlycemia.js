import { registerGlycemia } from '../controllers'
import { auth } from '../middlewares'
import { patientRepository, glycemiaRepository } from '../repositories'
import { wrapController, wrapMiddleware, Connection, jwt } from '../adapters'
import { validateRegisterGlycemia } from '../validators'

export default router => {
  const params = {
    Connection,
    patientRepository,
    glycemiaRepository
  }
  const authMiddleware = wrapMiddleware(auth, { jwt })

  router.post(
    '/glycemia',
    validateRegisterGlycemia,
    authMiddleware,
    wrapController(registerGlycemia, params)
  )

  return router
}