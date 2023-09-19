import { registerGlycemia } from '../controllers'
import { Connection } from '../adapters'
import { patientRepository, glycemiaRepository } from '../repositories'
import { validateRegisterGlycemia } from './validators'
import { wrapController } from './helpers'

export default router => {
  const params = {
    Connection,
    patientRepository,
    glycemiaRepository
  }

  router.post(
    'glycemia',
    validateRegisterGlycemia,
    wrapController(registerGlycemia, params)
  )

  return router
}