export class MissingParamError extends Error {
  constructor (public paramName: string) {
    super(`Missing Param: ${paramName}`)
    this.name = 'MissingParamError'
  }
}
