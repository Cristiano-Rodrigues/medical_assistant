import { InvalidEntry } from '../../errors'

export const invalidEntry = field => ({
  code: 400,
  error: new InvalidEntry(field)
})

export const serverError = (error) => ({
  code: 500,
  error
})

export const success = () => ({
  code: 200,
  success: true
})