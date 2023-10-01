import { deleteExercise } from '../../controllers'
import { auth } from '../../middlewares'
import { exerciseRepository } from '../../repositories'
import { wrapController, wrapMiddleware, Connection, jwt } from '../../adapters'
import { validateDeleteExercise } from '../../validators'

export default router => {
  const params = {
    Connection,
    exerciseRepository
  }
  const authMiddleware = wrapMiddleware(auth, { jwt })

  router.delete(
    '/exercise/:id',
    authMiddleware,
    validateDeleteExercise,
    wrapController(deleteExercise, params)
  )

  return router
}