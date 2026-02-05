import {
   checkIfIdIsValid,
  checkIfTypeIsValid,
  checkIfValueIsValid,
  created,
  invalidIdResponse,
  invalidTypeResponse,
  invalidValueResponse,
  requiredFieldsIsMissingResponse,
  serverError,
  validadeRequiredFields,
} from '../helpers/index.js'

export class CreateTransactionController {
  constructor(createTransactionUseCase) {
    this.createTransactionUseCase = createTransactionUseCase
  }

  async execute(httpRequest) {
    try {
      const params = httpRequest.body

      const requiredFields = ['user_id', 'name', 'date', 'value', 'type']

      const { ok: requiredFieldWereProvided, missingField } =
        validadeRequiredFields(params, requiredFields)

      if (!requiredFieldWereProvided) {
        return requiredFieldsIsMissingResponse(missingField)
      }

      const userIdIsValid = checkIfIdIsValid(params.user_id)

      if (!userIdIsValid) {
        return invalidIdResponse()
      }

      const valueIsValid = checkIfValueIsValid(params.value)

      if (!valueIsValid) {
        return invalidValueResponse
      }

      const type = params.type.trim().toUpperCase()

      const typeIsValid = checkIfTypeIsValid(params.type)

      if (!typeIsValid) {
        return invalidTypeResponse
      }

      const transaction = await this.createTransactionUseCase.execute({
        ...params,
        type,
      })

      return created(transaction)
    } catch (error) {
      console.error(error)
      return serverError
    }
  }
}
