import {
  type AddAccount,
  type AddAccountModel,
  type AccountModel,
  type Encrypter,
  type AddAccountRepository
} from './db-add-account.protocol'

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly encrypter: Encrypter,
    private readonly addAccountRepository: AddAccountRepository
  ) {}

  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(accountData.password)

    await this.addAccountRepository.add(
      Object.assign({}, accountData, {
        password: hashedPassword
      })
    )
    return await new Promise(resolve => {
      // @ts-expect-error
      resolve({})
    })
  }
}
