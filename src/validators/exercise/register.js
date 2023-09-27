import { body } from 'express-validator'
import { validate } from '../../adapters'

export const validateRegisterExercise = validate([
  body('type').notEmpty().isString(),
  body('duration').isNumeric(),
  body('observation').optional().isString()
])