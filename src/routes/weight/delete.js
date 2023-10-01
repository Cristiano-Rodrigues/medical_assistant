import { deleteWeight } from '../../controllers'
import { auth } from '../../middlewares'
import { weightRepository } from '../../repositories'
import { wrapController, wrapMiddleware, Connection, jwt } from '../../adapters'
import { validateDeleteWeight } from '../../validators'

export default router => {
  const params = {
    Connection,
    weightRepository
  }
  const authMiddleware = wrapMiddleware(auth, { jwt })

  router.delete(
    '/weight/:id',
    authMiddleware,
    validateDeleteWeight,
    wrapController(deleteWeight, params)
  )

  return router
}