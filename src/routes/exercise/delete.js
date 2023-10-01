import { deleteExercise } from '../../controllers'
import { auth } from '../../middlewares'
import { exerciseRepository } from '../../repositories'
import { wrapController, wrapMiddleware, Connection, jwt } from '../../adapters'

export default router => {
  const params = {
    Connection,
    exerciseRepository
  }
  const authMiddleware = wrapMiddleware(auth, { jwt })

  router.delete(
    '/exercise/:id',
    authMiddleware,
    wrapController(deleteExercise, params)
  )

  return router
}