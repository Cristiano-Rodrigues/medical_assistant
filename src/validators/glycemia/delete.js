import { param } from 'express-validator'
import { validate } from '../../adapters'

export const validateDeleteGlycemia = validate([
  param('id').isNumeric()
])