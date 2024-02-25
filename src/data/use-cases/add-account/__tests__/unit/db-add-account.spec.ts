import { DbAddAccount } from '../../db-add-account'
import {
  type Encrypter,
  type AddAccountModel,
  type AccountModel,
  type AddAccountRepository
} from '../../db-add-account.protocol'

const makeEncrypterStub = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt(value: string): Promise<string> {
      return await new Promise(resolve => {
        resolve('hashed_password')
      })
    }
  }
  return new EncrypterStub()
}

const makeAddAccountRepositoryStub = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add(account: AddAccountModel): Promise<AccountModel> {
      const fakeAccount = {
        id: '123',
        name: 'John Doe',
        email: 'john@mail.com',
        password: 'john123123'
      }
      return await new Promise(resolve => {
        resolve(fakeAccount)
      })
    }
  }
  return new AddAccountRepositoryStub()
}

interface SutTypes {
  sut: DbAddAccount
  encrypterStub: Encrypter
  addAccountRepositoryStub: AddAccountRepository
}

const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypterStub()
  const addAccountRepositoryStub = makeAddAccountRepositoryStub()
  const sut = new DbAddAccount(encrypterStub, addAccountRepositoryStub)

  return {
    sut,
    encrypterStub,
    addAccountRepositoryStub
  }
}

describe('DbAddAccount UseCase', () => {
  it('should call encrypter with correct password', async () => {
    const { sut, encrypterStub } = makeSut()

    const accountData = {
      name: 'John Doe',
      email: 'john@mail.com',
      password: 'john123123'
    }

    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')

    await sut.add(accountData)

    expect(encryptSpy).toHaveBeenCalledWith('john123123')
  })

  it('should throw if Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut()

    const accountData = {
      name: 'John Doe',
      email: 'john@mail.com',
      password: 'john123123'
    }

    jest.spyOn(encrypterStub, 'encrypt').mockReturnValueOnce(
      new Promise((_resolve, reject) => {
        reject(new Error())
      })
    )

    const accountPromise = sut.add(accountData)

    await expect(accountPromise).rejects.toThrow()
  })

  it('should call AddAccountRepository correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()

    const addAccountRepositorySpy = jest.spyOn(addAccountRepositoryStub, 'add')
    const accountData = {
      name: 'John Doe',
      email: 'john@mail.com',
      password: 'john123123'
    }

    await sut.add(accountData)
    expect(addAccountRepositorySpy).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@mail.com',
      password: 'hashed_password'
    })
  })

  it('should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()

    const accountData = {
      name: 'John Doe',
      email: 'john@mail.com',
      password: 'john123123'
    }

    jest.spyOn(addAccountRepositoryStub, 'add').mockReturnValueOnce(
      new Promise((_resolve, reject) => {
        reject(new Error())
      })
    )

    const accountPromise = sut.add(accountData)

    await expect(accountPromise).rejects.toThrow()
  })

  it('should return an account if on success', async () => {
    const { sut } = makeSut()

    const accountData = {
      name: 'John Doe',
      email: 'john@mail.com',
      password: 'john123123'
    }

    const account = await sut.add(accountData)

    expect(account).toEqual({
      id: '123',
      name: 'John Doe',
      email: 'john@mail.com',
      password: 'john123123'
    })
  })
})
