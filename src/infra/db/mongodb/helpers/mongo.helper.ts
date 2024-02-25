import { MongoClient, type Collection } from 'mongodb'
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const client: MongoClient = new MongoClient(process.env.MONGO_URL!)
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
