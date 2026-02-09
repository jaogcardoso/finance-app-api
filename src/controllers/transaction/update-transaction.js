import {
  checkIfIdIsValid,
  invalidIdResponse,
  serverError,
  badRequest,
  checkIfValueIsValid,
  invalidValueResponse,
  checkIfTypeIsValid,
  invalidTypeResponse,
  ok,
} from '../helpers/index.js'

export class UpdateTransactionController {
constructor(updateTransactionUseCase){
    this.updateTransactionUseCase = updateTransactionUseCase
}

  async execute(httpRequest) {
    try {
      const idIsValid = checkIfIdIsValid(httpRequest.params.transctionId)

      if (!idIsValid) {
        return invalidIdResponse()
      }

      const params = httpRequest.body

      const allowedFields = ['name', 'date', 'value', 'type']

      const someFieldIsNotAllowed = Object.keys(params).some(
        (field) => !allowedFields.includes(field),
      )
      if (someFieldIsNotAllowed) {
        return badRequest({
          message: 'Some provided field is not allowed.',
        })
      }

      if (params.value) {
        const valueIsValid = checkIfValueIsValid(params.value)

        if (!valueIsValid) {
          return invalidValueResponse()
        }
      }

      if (params.type) {
        const typeIsValid = checkIfTypeIsValid(params.type)

        if (!typeIsValid) {
          return invalidTypeResponse()
        }
      }

      const transaction = await this.updateTransactionUseCase.execute(httpRequest.params.transctionId,params)

      return ok(transaction)
    } catch (error) {
      console.error(error)
      return serverError()
    }
  }
}
