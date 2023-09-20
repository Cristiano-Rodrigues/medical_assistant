import { body } from 'express-validator'
import { validate } from '../../../adapters'

export const validateLogin = validate([
  body('email').isEmail(),
  body('password').isLength({ min: 8 })
])