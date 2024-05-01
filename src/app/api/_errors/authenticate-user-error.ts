export class AuthenticateUserError extends Error {
  constructor() {
    super('Email/Password not valid')
  }
}
