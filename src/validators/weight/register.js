import { body } from 'express-validator'
import { validate } from '../../adapters'

export const validateRegisterWeight = validate([
  body('weight').isNumeric(),
  body('height').isNumeric(),
  body('observation').optional().isString()
])