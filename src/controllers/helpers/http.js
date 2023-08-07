import { InvalidEntry } from '../../errors/invalidEntry'

export const invalidEntry = field => ({
  code: 400,
  error: new InvalidEntry(field)
})

export const serverError = () => ({
  code: 500,
  error: new Error('Server Error')
})

export const success = () => ({
  code: 200,
  success: true
})