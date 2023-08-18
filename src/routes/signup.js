import { signup } from '../controllers'
import { Connection, mailer, hasher } from '../adapters'
import { patientRepository } from '../repositories'
import { validateSignUp } from './validators'
import { wrapController } from './helpers'

export default router => {
  const params = {
    Connection,
    mailer,
    hasher,
    patientRepository
  }

  router.post(
    '/signup',
    validateSignUp,
    wrapController(signup, params)
  )

  return router
}