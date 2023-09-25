import { param } from 'express-validator'
import { validate } from '../../adapters'

export const validateGetGlycemiaById = validate([
  param('id').isNumeric()
])