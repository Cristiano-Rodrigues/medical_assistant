import { DuplicatedEntry, InvalidEntry, Unauthorized } from '../errors'

export const invalidEntry = field => ({
  code: HttpStatusCodes.BadRequest,
  error: new InvalidEntry(field),
  location: field
})

export const duplicatedEntry = field => ({
  code: HttpStatusCodes.BadRequest,
  error: new DuplicatedEntry(field),
  location: field
})

export const unauthorized = () => ({
  code: HttpStatusCodes.Unauthorized,
  error: new Unauthorized()
})

export const serverError = (error) => ({
  code: HttpStatusCodes.ServerError,
  error
})

export const success = (additionalData = {}) => ({
  code: HttpStatusCodes.Ok,
  success: true,
  ...additionalData
})

export const HttpStatusCodes = {
  BadRequest: 400,
  Unauthorized: 401,
  ServerError: 500,
  Ok: 200
}