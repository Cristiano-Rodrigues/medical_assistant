import { ok } from '../../controllers'
import { wrapController } from '../../adapters'

export default router => {

  router.get(
    '/ok',
    wrapController(ok)
  )

  return router
}