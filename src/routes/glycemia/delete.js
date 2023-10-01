import { deleteGlycemia } from '../../controllers'
import { auth } from '../../middlewares'
import { glycemiaRepository } from '../../repositories'
import { wrapController, wrapMiddleware, Connection, jwt } from '../../adapters'
import { validateDeleteGlycemia } from '../../validators'

export default router => {
  const params = {
    Connection,
    glycemiaRepository
  }
  const authMiddleware = wrapMiddleware(auth, { jwt })

  router.delete(
    '/glycemia/:id',
    authMiddleware,
    validateDeleteGlycemia,
    wrapController(deleteGlycemia, params)
  )

  return router
}