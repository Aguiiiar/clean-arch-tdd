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
})
