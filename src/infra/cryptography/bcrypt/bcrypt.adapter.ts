import { type Encrypter } from './bcrypt-adapter.protocol'
import bcrypt from 'bcryptjs'

export class BCryptAdapter implements Encrypter {
  constructor(private readonly salt: number) {}

  async encrypt(value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt)

    return hash
  }
}
