import { type Router } from 'express'

export default (router: Router): void => {
  router.post('/sign-up', (req, res) => {
    res.json({
      msg: 'ok'
    })
  })
}
