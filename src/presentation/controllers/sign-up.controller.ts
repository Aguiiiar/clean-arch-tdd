import { MissingParamError } from '../errors/missing-param.error'
import { badRequest } from '../helpers/http.helper'
import { type Controller } from '../protocols/controller.protocol'
import { type HttpRequest, type HttpResponse } from '../protocols/http.protocol'

export class SignUpController implements Controller {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }

    return {
      statusCode: 200,
      body: {}
    }
  }
}
