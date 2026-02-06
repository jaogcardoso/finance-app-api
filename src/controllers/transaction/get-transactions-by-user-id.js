import { UserNotFoundError } from '../../errors/user.js'
import {
  checkIfIdIsValid,
  invalidIdResponse,
  ok,
  requiredFieldsIsMissingResponse,
  serverError,
  userNotFoundResponse,
} from '../helpers'

export class GetTransactionsByUserId {
  constructor(getTransactionsByUserIdUseCase) {
    this.getTransactionsByUserIdUseCase = getTransactionsByUserIdUseCase
  }
  async execute(httpRequest) {
    try {
      const userId = httpRequest.query.userId
      //verificar se user id foi passado como parametro
      if (!userId) {
        return requiredFieldsIsMissingResponse('userId')
      }

      //verificar se o userid é um id valido
      const userIdIsValid = checkIfIdIsValid(userId)

      if (!userIdIsValid) {
        return invalidIdResponse()
      }

      //chamar o use case
      const transactions = await this.getTransactionsByUserIdUseCase.execute({
        userId,
      })

      //retornar resposta
      return ok(transactions)
    } catch (error) {
      console.error(error)

      if (error instanceof UserNotFoundError) return userNotFoundResponse()
    }
    return serverError()
  }
}
