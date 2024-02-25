import { EmailValidatorAdapter } from './email-validator-adapter.util'

describe('EmailValidator Adapter', () => {
  it('should return false if validator returns false', () => {
    const sut = new EmailValidatorAdapter()

    const isValid = sut.isValid('invalid_mail@mail.com')

    expect(isValid).toBe(false)
  })
})
