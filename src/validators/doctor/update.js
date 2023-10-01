import { body } from 'express-validator'
import { validate } from '../../adapters'

export const validateUpdateDoctor = validate([
  body('name').optional().isString(),
  body('phone').optional().isString(),
  body('alternativeNumber').optional().isString(),
  body('email').optional().isEmail()
])