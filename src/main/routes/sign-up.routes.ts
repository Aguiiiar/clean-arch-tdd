import { type Router } from 'express'
import { makeSignUpController } from '../factories/sign-uo.factory'
import { adaptRoute } from '../adapters/express-routes.adapter'

export default (router: Router): void => {
  router.post('/sign-up', adaptRoute(makeSignUpController()))
}
