import {
  serverError,
  checkIfIdIsValid,
  invalidIdResponse,
  ok,
  transactionNotFoundResponse,
} from '../helpers/index.js'

export class DeleteTransactionController {
  constructor(deleteTransactionUseCase) {
    this.deleteTransactionUseCase = deleteTransactionUseCase
  }
  async execute(httpRequest) {
    try {
      const transactionId = httpRequest.params.transactionId
      const userId = httpRequest.params.user_id

      const transactionIdIsValid = checkIfIdIsValid(httpRequest.params.transactionId)
      const userIdIsValid = checkIfIdIsValid(httpRequest.params.user_id)

      if (!transactionIdIsValid || ! userIdIsValid) {
        return invalidIdResponse()
      }

      const deletedTransaction = await this.deleteTransactionUseCase.execute(
        transactionId,
        userId
      )

      if (!deletedTransaction) {
        return transactionNotFoundResponse()
      }

      return ok(deletedTransaction)
    } catch (error) {
      console.error(error)
      return serverError()
    }
  }
}
