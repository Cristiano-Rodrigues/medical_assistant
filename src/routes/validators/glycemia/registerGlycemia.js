import { body } from 'express-validator'
import { validate } from '../../../adapters'

export const validateRegisterGlycemia = validate([
  body('level').isNumeric().notEmpty(),
  body('patientId').isNumeric().notEmpty(),
  body('observation').optional().isString()
])