import { DbAddAccount } from '../../data/use-cases/add-account/db-add-account'
import { BCryptAdapter } from '../../infra/cryptography/bcrypt/bcrypt.adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'
import { SignUpController } from '../../presentation/controllers/signup/sign-up.controller'
import { EmailValidatorAdapter } from '../../presentation/utils/email-validator-adapter.util'

export const makeSignUpController = (): SignUpController => {
  const emailValidatorAdapter = new EmailValidatorAdapter()

  const bcryptAdapter = new BCryptAdapter(12)
  const accountRepositoryAdapter = new AccountMongoRepository()
  const addAccountAdapter = new DbAddAccount(
    bcryptAdapter,
    accountRepositoryAdapter
  )

  return new SignUpController(emailValidatorAdapter, addAccountAdapter)
}
