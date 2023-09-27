import { param } from 'express-validator'
import { validate } from '../../adapters'

export const validateGetWeightById = validate([
  param('id').isNumeric()
])