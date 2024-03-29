import { type NextFunction, type Request, type Response } from 'express'

export const contentType = (
  _request: Request,
  response: Response,
  next: NextFunction
): void => {
  response.type('json')

  next()
}
