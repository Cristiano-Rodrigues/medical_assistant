import { getAllExercise } from '../../controllers'
import { auth } from '../../middlewares'
import { exerciseRepository } from '../../repositories'
import { wrapController, wrapMiddleware, Connection, jwt } from '../../adapters'

export default router => {
  const params = {
    Connection,
    exerciseRepository
  }
  const authMiddleware = wrapMiddleware(auth, { jwt })

  router.get(
    '/exercise',
    authMiddleware,
    wrapController(getAllExercise, params)
  )

  return router
}