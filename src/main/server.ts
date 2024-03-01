import { MongoHelper } from '../infra/db/mongodb/helpers/mongo.helper'
import app from './config/app'

MongoHelper.connect()
  .then(() => {
    console.log('MongoDB running')
    app.listen(3333, () => {
      console.log('Server running at http://localhost:3333')
    })
  })
  .catch(err => {
    console.error(err)
  })
