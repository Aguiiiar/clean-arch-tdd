import { type AccountModel, type AddAccountModel } from '../models'

export interface AddAccount {
  add: (account: AddAccountModel) => Promise<AccountModel>
}
