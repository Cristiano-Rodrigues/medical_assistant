import { registerGlycemia } from '../controllers'
import { auth } from '../middlewares'
import { patientRepository, glycemiaRepository } from '../repositories'
import { Connection, jwt } from '../adapters'
import { validateRegisterGlycemia } from './validators'
import { wrapController, wrapMiddleware } from './helpers'

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