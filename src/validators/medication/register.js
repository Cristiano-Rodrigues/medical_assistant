import { body } from 'express-validator'
import { validate } from '../../adapters'

export const validateRegisterMedication = validate([
  body('name').notEmpty().isString(),
  body('dosage').notEmpty().isString(),
  body('observation').optional().isString()
])