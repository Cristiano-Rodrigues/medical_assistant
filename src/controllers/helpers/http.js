import { InvalidEntry, ServerError } from '../../errors'

export const invalidEntry = field => ({
  code: 400,
  error: new InvalidEntry(field)
})

export const serverError = () => ({
  code: 500,
  error: new ServerError()
})

export const success = () => ({
  code: 200,
  success: true
})