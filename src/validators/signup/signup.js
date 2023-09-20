import { body } from 'express-validator'
import { validate } from '../../adapters'

export const validateSignUp = validate([
  body('name').isString().notEmpty(),
  body('gender').isIn(['m', 'f']),
  body('born').isISO8601(),
  body('address').optional().isString(),
  body('phone').optional().isString(),
  body('email').isEmail(),
  body('password').isLength({ min: 8 })
])