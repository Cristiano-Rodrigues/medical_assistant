import { getAllGlycemia } from '../../controllers'
import { auth } from '../../middlewares'
import { glycemiaRepository } from '../../repositories'
import { wrapController, wrapMiddleware, Connection, jwt } from '../../adapters'

export default router => {
  const params = {
    Connection,
    glycemiaRepository
  }
  const authMiddleware = wrapMiddleware(auth, { jwt })

  router.get(
    '/glycemia',
    authMiddleware,
    wrapController(getAllGlycemia, params)
  )

  return router
}