import { param } from 'express-validator'
import { validate } from '../../adapters'

export const validateGetMedicationById = validate([
  param('id').isNumeric()
])