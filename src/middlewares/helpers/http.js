import { Unauthorized } from '../../errors'

export const unauthorized = () => ({
  code: HttpStatusCodes.Unauthorized,
  error: new Unauthorized()
})

export const success = () => ({
  code: HttpStatusCodes.Ok,
  success: true
})

export const HttpStatusCodes = {
  Unauthorized: 401,
  Ok: 200
}