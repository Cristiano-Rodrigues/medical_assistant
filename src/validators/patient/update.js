import { body } from 'express-validator'
import { validate } from '../../adapters'

export const validateUpdatePatient = validate([
  body('name').optional().isString(),
  body('gender').optional().isIn(['m', 'f']),
  body('born').optional().isISO8601(),
  body('address').optional().isString(),
  body('phone').optional().isString(),
  body('email').optional().isEmail()
])