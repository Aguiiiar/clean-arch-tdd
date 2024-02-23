import { InvalidParamError, MissingParamError } from '../errors/'
import { badRequest, serverError } from '../helpers/http.helper'
import { type HttpRequest, type HttpResponse, type EmailValidator, type Controller } from '../protocols'

export class SignUpController implements Controller {
  constructor (private readonly emailValidator: EmailValidator) {}

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { password, passwordConfirmation } = httpRequest.body

      if (password !== passwordConfirmation) return badRequest(new InvalidParamError('passwordConfirmation'))

      const isValid = this.emailValidator.isValid(httpRequest.body.email as string)

      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      return {
        statusCode: 200,
        body: {}
      }
    } catch (err) {
      return serverError()
    }
  }
}
