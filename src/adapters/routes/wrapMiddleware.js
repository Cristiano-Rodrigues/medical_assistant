export function wrapMiddleware (middleware, params) {
  return async (req, res, next) => {
    const response = await middleware(req, params)

    console.log(`Request "${middleware.name}". Result: `, JSON.stringify(response))

    if (response.success) {
      return next()
    }

    if (response.error) {
      res.status(response.code).send(response)
    }
  }
}