import {
  type AddAccount,
  type AddAccountModel,
  type AccountModel,
  type Encrypter
} from './db-add-account.protocol'

export class DbAddAccount implements AddAccount {
  constructor(private readonly encrypter: Encrypter) {}

  async add(account: AddAccountModel): Promise<AccountModel> {
    await this.encrypter.encrypt(account.password)

    return await new Promise(resolve => {
      // @ts-expect-error
      resolve({})
    })
  }
}
