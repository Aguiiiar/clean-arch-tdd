import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo.helper'

describe('Bory Parser Middleware', () => {
  beforeAll(async () => {
    await MongoHelper.connect()
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  it('should return an account on success', async () => {
    await request(app)
      .post('/api/sign-up')
      .send({
        name: 'Jonh Doe',
        email: 'john_doe@gmail.com',
        password: 'john_doe213213',
        passwordConfirmation: 'john_doe213213'
      })
      .expect(200)
  })
})
