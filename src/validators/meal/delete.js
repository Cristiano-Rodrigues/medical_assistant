import { param } from 'express-validator'
import { validate } from '../../adapters'

export const validateDeleteMeal = validate([
  param('id').isNumeric()
])