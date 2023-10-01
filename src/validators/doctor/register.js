import { body } from 'express-validator'
import { validate } from '../../adapters'

export const validateRegisterDoctor = validate([
  body('name').notEmpty().isString(),
  body('phone').notEmpty().isString(),
  body('alternativeNumber').optional().isString(),
  body('email').optional().isEmail()
])