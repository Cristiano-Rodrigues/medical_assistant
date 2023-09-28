import { getExerciseById } from '../../controllers'
import { auth } from '../../middlewares'
import { exerciseRepository } from '../../repositories'
import { wrapController, wrapMiddleware, Connection, jwt } from '../../adapters'
import { validateGetExerciseById } from '../../validators'

export default router => {
  const params = {
    Connection,
    exerciseRepository
  }
  const authMiddleware = wrapMiddleware(auth, { jwt })

  router.get(
    '/exercise/:id',
    authMiddleware,
    validateGetExerciseById,
    wrapController(getExerciseById, params)
  )

  return router
}