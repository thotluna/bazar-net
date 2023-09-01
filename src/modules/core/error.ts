export class Error {
  message
  name
  constructor(message: string) {
    this.message = message
    this.name = 'Error' // (diferentes nombres para diferentes clases error incorporadas)
  }
}
