import { ServerError } from '../../errors'

export function wrapController (controller, params) {
  return async (req, res) => {
    const result = await controller(req, params)
    console.log(`Request "${controller.name}". Result: `, JSON.stringify(result))

    res.status(result.code)
    if (result.code >= 500) {
      return res.send({ error: new ServerError() })
    }
    res.send(result)
  }
}