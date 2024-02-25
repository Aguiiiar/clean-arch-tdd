import { MongoClient } from 'mongodb'

export const MongoHelper = {
  client: MongoClient,
  async connect(uri: string): Promise<void> {
    await MongoClient.connect('')
  },

  async disconnect(): Promise<void> {
    this.client.close()
  }
}
