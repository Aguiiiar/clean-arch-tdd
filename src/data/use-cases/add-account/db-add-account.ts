import { type AddAccount } from '../../../domain/use-cases'
import { type AddAccountModel, type AccountModel } from '../../../domain/models'
import { type Encrypter } from '../../protocols/encrypter.protocol'

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
