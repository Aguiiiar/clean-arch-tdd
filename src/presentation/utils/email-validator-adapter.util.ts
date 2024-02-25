import { type EmailValidator } from '../protocols/email-validadtor.protocol'

export class EmailValidatorAdapter implements EmailValidator {
  isValid(email: string): boolean {
    return false
  }
}
