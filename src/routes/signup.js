import { signup } from '../controllers'
import { mailer, hasher, connection } from '../adapters'
import { patientRepository } from '../repositories'
import { validateSignUp } from './validators'
import { wrapController } from './helpers'

export default router => {
  const params = {
    mailer,
    hasher,
    connection,
    patientRepository
  }

  router.post(
    '/signup',
    validateSignUp,
    wrapController(signup, params)
  )

  return router
}