import { getGlycemiaById } from '../../controllers'
import { auth } from '../../middlewares'
import { glycemiaRepository } from '../../repositories'
import { wrapController, wrapMiddleware, Connection, jwt } from '../../adapters'
import { validateGetGlycemiaById } from '../../validators'

export default router => {
  const params = {
    Connection,
    glycemiaRepository
  }
  const authMiddleware = wrapMiddleware(auth, { jwt })

  router.get(
    '/glycemia/:id',
    validateGetGlycemiaById,
    authMiddleware,
    wrapController(getGlycemiaById, params)
  )

  return router
}