import request from 'supertest'
import app from '../config/app'

describe('Bory Parser Middleware', () => {
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
