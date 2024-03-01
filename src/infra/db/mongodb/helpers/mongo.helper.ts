import { MongoClient, type Collection } from 'mongodb'
import env from '../../../../main/config/env'

const client: MongoClient = new MongoClient(env.MONGO_URL)

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
