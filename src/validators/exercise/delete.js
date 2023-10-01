import { param } from 'express-validator'
import { validate } from '../../adapters'

export const validateDeleteExercise = validate([
  param('id').isNumeric()
])