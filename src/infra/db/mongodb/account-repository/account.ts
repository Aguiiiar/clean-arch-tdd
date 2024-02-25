import { MongoHelper } from '../helpers/mongo.helper'
import {
  type AccountModel,
  type AddAccountModel,
  type AddAccountRepository
} from './account.protocol'

export class AccountMongoRepository implements AddAccountRepository {
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const collection = MongoHelper.getCollection('accounts')

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    const result = await collection.insertOne(accountData)

    const { id, name, email, password } = Object.assign({}, accountData, {
      id: result.insertedId.toString()
    })

    return { id, name, email, password }
  }
}
