import { getDoctorById } from '../../controllers'
import { auth } from '../../middlewares'
import { doctorRepository } from '../../repositories'
import { wrapController, wrapMiddleware, Connection, jwt } from '../../adapters'
import { validateGetDoctorById } from '../../validators'

export default router => {
  const params = {
    Connection,
    doctorRepository
  }
  const authMiddleware = wrapMiddleware(auth, { jwt })

  router.get(
    '/doctor/:id',
    authMiddleware,
    validateGetDoctorById,
    wrapController(getDoctorById, params)
  )

  return router
}