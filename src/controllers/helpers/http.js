import { DuplicatedEntry, InvalidEntry } from '../../errors'

export const invalidEntry = field => ({
  code: HttpStatusCodes.BadRequest,
  error: new InvalidEntry(field)
})

export const duplicatedEntry = field => ({
  code: HttpStatusCodes.BadRequest,
  error: new DuplicatedEntry(field)
})

export const serverError = (error) => ({
  code: HttpStatusCodes.ServerError,
  error
})

export const success = () => ({
  code: HttpStatusCodes.Ok,
  success: true
})

const HttpStatusCodes = {
  BadRequest: 400,
  ServerError: 500,
  Ok: 200
}