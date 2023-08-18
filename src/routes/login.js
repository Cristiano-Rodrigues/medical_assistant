import { login } from '../controllers'
import { Connection, hasher, jwt } from '../adapters'
import { patientRepository } from '../repositories'
import { validateLogin } from './validators'
import { wrapController } from './helpers'

export default router => {
  const params = {
    jwt,
    hasher,
    Connection,
    patientRepository
  }

  router.post(
    '/login',
    validateLogin,
    wrapController(login, params)
  )

  return router
}