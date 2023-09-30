import { body } from 'express-validator'
import { validate } from '../../adapters'

export const validateRegisterMeal = validate([
  body('meal').isString().notEmpty(),
  body('calories').isNumeric(),
  body('observation').optional().isString()
])