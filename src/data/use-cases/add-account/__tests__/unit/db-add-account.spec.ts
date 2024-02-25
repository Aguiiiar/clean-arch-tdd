import { type Encrypter } from '../../../../protocols/encrypter.protocol'
import { DbAddAccount } from '../../db-add-account'

class EncrypterStub implements Encrypter {
  async encrypt(value: string): Promise<string> {
    return await new Promise(resolve => {
      resolve('hashed_password')
    })
  }
}

interface SutTypes {
  sut: DbAddAccount
  encrypterStub: Encrypter
}

const makeSut = (): SutTypes => {
  const encrypterStub = new EncrypterStub()
  const sut = new DbAddAccount(encrypterStub)

  return {
    sut,
    encrypterStub
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
})
