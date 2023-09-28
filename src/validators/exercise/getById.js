import { param } from 'express-validator'
import { validate } from '../../adapters'

export const validateGetExerciseById = validate([
  param('id').isNumeric()
])