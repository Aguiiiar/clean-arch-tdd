import { MissingParamError } from '../../../errors/missing-param.error'
import { SignUpController } from '../../sign-up.controller'

describe('SignUp controller', () => {
  it('should return 400 if no name is provided', async () => {
    const sut = new SignUpController()

    const httpRequest = {
      body: {
        email: 'john@email.com',
        password: '123123213',
        passwordConfirmation: '123123213'
      }
    }
    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })

  it('should return 400 if no email is provided', async () => {
    const sut = new SignUpController()

    const httpRequest = {
      body: {
        name: 'John Doe',
        password: '123123213',
        passwordConfirmation: '123123213'
      }
    }
    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })
})
