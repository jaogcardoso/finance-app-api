import validator from 'validator'
import {
  badRequest,
  checkIfIdIsValid,
  created,
  invalidIdResponse,
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

      const {ok: requiredFieldWereProvided, missingField} = validadeRequiredFields(
        params,
        requiredFields,
      )

      if (!requiredFieldWereProvided) {
        return requiredFieldsIsMissingResponse(missingField)
      }

      const userIdIsValid = checkIfIdIsValid(params.user_id)

      if (!userIdIsValid) {
        return invalidIdResponse()
      }

      const valueIsValid = validator.isCurrency(params.value.toString(), {
        digits_after_decimal: [2],
        allow_negatives: false,
        decimal_separator: '.',
      })

      if (!valueIsValid) {
        return badRequest({
          message: 'The value must be a valid currency',
        })
      }

      const type = params.type.trim().toUpperCase()

      const typeIsValid = ['EARNING', 'EXPENSE', 'INVESTMENT'].includes(type)

      if (!typeIsValid) {
        return badRequest({
          message: 'The type must be valid',
        })
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
