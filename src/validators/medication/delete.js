import { param } from 'express-validator'
import { validate } from '../../adapters'

export const validateDeleteMedication = validate([
  param('id').isNumeric()
])