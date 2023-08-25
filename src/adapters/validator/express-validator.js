import { validationResult } from 'express-validator'
import { InvalidEntry } from '../../errors'

export const validate = validations => {
  return async (req, res, next) => {
    for (let validation of validations) {
      const result = await validation.run(req)
      if (result.errors.length) break
    }

    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }
    
    const field = errors.array()[0].path

    res.status(400).send({
      code: 400,
      error: new InvalidEntry(field),
      location: field
    })
  }
}