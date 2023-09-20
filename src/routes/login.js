import { login } from '../controllers'
import { wrapController, Connection, hasher, jwt, } from '../adapters'
import { patientRepository } from '../repositories'
import { validateLogin } from '../validators'

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