import { ForbiddenError, TransactionNotFoundError } from '../../errors/user.js'
import {
  serverError,
  checkIfIdIsValid,
  invalidIdResponse,
  ok,
  notFound,
  forbidden,
} from '../helpers/index.js'

export class DeleteTransactionController {
  constructor(deleteTransactionUseCase) {
    this.deleteTransactionUseCase = deleteTransactionUseCase
  }
  async execute(httpRequest) {
    try {
      const transactionId = httpRequest.params.transactionId
      const userId = httpRequest.userId

      const transactionIdIsValid = checkIfIdIsValid(
        httpRequest.params.transactionId,
      )

      if (!transactionIdIsValid) {
        return invalidIdResponse()
      }

      const deletedTransaction = await this.deleteTransactionUseCase.execute(
        transactionId,
        userId,
      )

      if (!deletedTransaction) {
        return TransactionNotFoundError()
      }

      return ok(deletedTransaction)
    } catch (error) {

      if (error instanceof TransactionNotFoundError) {
        return notFound(error.message)
      }

      if (error instanceof ForbiddenError) {
        return forbidden(error.message)
      }

      console.error(error)
      return serverError()
    }
  }
}
