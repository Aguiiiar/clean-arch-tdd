import { InvalidParamError } from '../errors/invalid-param.error'
import { MissingParamError } from '../errors/missing-param.error'
import { badRequest } from '../helpers/http.helper'
import { type Controller } from '../protocols/controller.protocol'
import { type EmailValidator } from '../protocols/email-validadtor.protocol'
import { type HttpRequest, type HttpResponse } from '../protocols/http.protocol'

export class SignUpController implements Controller {
  constructor (private readonly emailValidator: EmailValidator) {}

  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }

    const isValid = this.emailValidator.isValid(httpRequest.body.email as string)

    if (!isValid) {
      return badRequest(new InvalidParamError('email'))
    }

    return {
      statusCode: 200,
      body: {}
    }
  }
}
