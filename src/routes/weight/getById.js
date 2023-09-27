import { getWeightById } from '../../controllers'
import { auth } from '../../middlewares'
import { weightRepository } from '../../repositories'
import { wrapController, wrapMiddleware, Connection, jwt } from '../../adapters'
import { validateGetWeightById } from '../../validators'

export default router => {
  const params = {
    Connection,
    weightRepository
  }
  const authMiddleware = wrapMiddleware(auth, { jwt })

  router.get(
    '/weight/:id',
    authMiddleware,
    validateGetWeightById,
    wrapController(getWeightById, params)
  )

  return router
}