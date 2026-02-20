import { ForbiddenError } from '../../errors/user.js'
import {
  checkIfIdIsValid,
  invalidIdResponse,
  serverError,
  checkIfValueIsValid,
  invalidValueResponse,
  checkIfTypeIsValid,
  invalidTypeResponse,
  ok,
  forbidden,
} from '../helpers/index.js'

export class UpdateTransactionController {
  constructor(updateTransactionUseCase) {
    this.updateTransactionUseCase = updateTransactionUseCase
  }

  async execute(httpRequest) {
    try {
      const idIsValid = checkIfIdIsValid(httpRequest.params.transactionId)

      if (!idIsValid) {
        return invalidIdResponse()
      }

      const params = httpRequest.body

      const allowedFields = ['name', 'date', 'value', 'type']
      const filteredParams = {}

      for (const field of allowedFields) {
  if (field in params) {
    filteredParams[field] = params[field]
  }
}

      if (params.value) {
        const valueIsValid = checkIfValueIsValid(params.value)

        if (!valueIsValid) {
          return invalidValueResponse()
        }
      }

      if ('type' in params) {
        const typeIsValid = checkIfTypeIsValid(params.type)

        if (!typeIsValid) {
          return invalidTypeResponse()
        }
        params.type = params.type.toUpperCase()
      }

      const transaction = await this.updateTransactionUseCase.execute(
        httpRequest.params.transactionId,
        params,
      )

      return ok(transaction)
    } catch (error) {
      console.error(error)
      if (error instanceof ForbiddenError) {
        return forbidden()
      }
      return serverError()
    }
  }
}
