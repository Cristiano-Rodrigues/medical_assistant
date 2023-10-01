import { param } from 'express-validator'
import { validate } from '../../adapters'

export const validateDeleteDoctor = validate([
  param('id').isNumeric()
])