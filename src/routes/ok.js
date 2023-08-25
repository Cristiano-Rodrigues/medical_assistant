import { ok } from '../controllers'
import { wrapController } from './helpers'

export default router => {

  router.get(
    '/ok',
    wrapController(ok)
  )

  return router
}