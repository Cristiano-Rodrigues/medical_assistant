import { getAllWeight } from '../../controllers'
import { auth } from '../../middlewares'
import { weightRepository } from '../../repositories'
import { wrapController, wrapMiddleware, Connection, jwt } from '../../adapters'

export default router => {
  const params = {
    Connection,
    weightRepository
  }
  const authMiddleware = wrapMiddleware(auth, { jwt })

  router.get(
    '/weight',
    authMiddleware,
    wrapController(getAllWeight, params)
  )

  return router
}