export class InvalidParamError extends Error {
  constructor (public paramName: string) {
    super(`Invalid Param: ${paramName}`)
    this.name = 'InvalidParamError'
  }
}
