export function wrapController (controller, params) {
  return async (req, res) => {
    const result = await controller(req, params)
    res.status(result.code).send(result)
  }
}