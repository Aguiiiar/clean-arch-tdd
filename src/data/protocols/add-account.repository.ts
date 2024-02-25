import { type AccountModel, type AddAccountModel } from '../../domain/models'

export interface AddAccountRepository {
  add: (account: AddAccountModel) => Promise<AccountModel>
}
