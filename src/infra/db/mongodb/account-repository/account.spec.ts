import { AccountMongoRepository } from './account'
import { type AddAccount } from './account.protocol'
import { MongoHelper } from '../helpers/mongo.helper'

interface SutTypes {
  sut: AddAccount
}

const makeSut = (): SutTypes => {
  const sut = new AccountMongoRepository()

  return { sut }
}

describe('Account MongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect()
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })
  it('should return an account on success', async () => {
    const { sut } = makeSut()

    const account = await sut.add({
      name: 'any name',
      email: 'any_email@mail.com',
      password: 'any password'
    })

    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any name')
    expect(account.email).toBe('any_email@mail.com')
    expect(account.password).toBe('any password')
  })
})
