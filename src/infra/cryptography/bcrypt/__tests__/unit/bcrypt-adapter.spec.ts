import { type Encrypter } from '../../../../../data/protocols/encrypter.protocol'
import { BCryptAdapter } from '../../bcrypt.adapter'
import bcrypt from 'bcryptjs'

interface SutTypes {
  sut: Encrypter
}

const makeSut = (): SutTypes => {
  const sut = new BCryptAdapter(12)

  return {
    sut
  }
}

describe('Bcrypt Adapter', () => {
  it('should call bcrypt with correct values', async () => {
    const { sut } = makeSut()

    const hashSpy = jest.spyOn(bcrypt, 'hash')

    await sut.encrypt('any_value')

    expect(hashSpy).toHaveBeenCalledWith('any_value', 12)
  })
})
