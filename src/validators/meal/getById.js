import { param } from 'express-validator'
import { validate } from '../../adapters'

export const validateGetMealById = validate([
  param('id').isNumeric()
])