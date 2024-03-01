import { MongoClient, type Collection } from 'mongodb'

const client: MongoClient = new MongoClient('mongodb://127.0.0.1:27017')

export const MongoHelper = {
  async connect(): Promise<void> {
    await client.connect()
  },

  async disconnect(): Promise<void> {
    await client.close()
  },

  getCollection(name: string): Collection {
    return client.db().collection(name)
  }
}
