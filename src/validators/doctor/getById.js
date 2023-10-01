import { param } from 'express-validator'
import { validate } from '../../adapters'

export const validateGetDoctorById = validate([
  param('id').isNumeric()
])