import { registerExercise } from '../../controllers'
import { auth } from '../../middlewares'
import { exerciseRepository } from '../../repositories'
import { wrapController, wrapMiddleware, Connection, jwt } from '../../adapters'
import { validateRegisterExercise } from '../../validators'

export default router => {
  const params = {
    Connection,
    exerciseRepository
  }
  const authMiddleware = wrapMiddleware(auth, { jwt })

  router.post(
    '/exercise',
    authMiddleware,
    validateRegisterExercise,
    wrapController(registerExercise, params)
  )

  return router
}