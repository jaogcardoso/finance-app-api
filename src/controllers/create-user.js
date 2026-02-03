import { EmailAlreadyInUseError } from '../errors/user.js'
import {
  checkIfEmailIsValid,
  checkIfPasswordIsValid,
  emailAlreadyInUseResponse,
  invalidPasswordResponse,
  badRequest,
  serverError,
  created,
} from './helpers/index.js'

export class CreateUserController {
  constructor(createUserUseCase){
    this.createUserUseCase = createUserUseCase

  }
  async execute(httpRequest) {
    try {
      const params = httpRequest.body

      // validar a requisição (campos obrigatorios, tamanho de senha e email)

      const requiredFields = ['first_name', 'last_name', 'email', 'password']

      for (const field of requiredFields) {
        if (!params[field] || params[field].trim().length === 0) {
          return badRequest({ message: `Missing params ${field}` })
        }
      }

      const passwordIsValid = checkIfPasswordIsValid(params.password)

      if (passwordIsValid) {
        return invalidPasswordResponse()
      }

      const emailIsValid = checkIfEmailIsValid(params.email)
      if (!emailIsValid) {
        return emailAlreadyInUseResponse()
      }

      // chamar o use case
      
      const createdUser = await this.createUserUseCase.execute(params)

      // retornar a resposta para o usuario (status code)

      return created(createdUser)
    } catch (error) {
      if (error instanceof EmailAlreadyInUseError) {
        return badRequest({ message: error.message })
      }
      console.error(error)
      return serverError()
    }
  }
}
