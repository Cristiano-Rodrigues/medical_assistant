import { param } from 'express-validator'
import { validate } from '../../adapters'

export const validateDeleteWeight = validate([
  param('id').isNumeric()
])