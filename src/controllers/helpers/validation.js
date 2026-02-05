import validator from 'validator'
import { badRequest } from './http.js'

export const checkIfIdIsValid = (id) => validator.isUUID(id)

export const invalidIdResponse = () =>
  badRequest({
    message: 'The provited id is not valid',
  })

export const checkIsString = (value) => typeof value === 'string'

export const validadeRequiredFields = (params, requiredFields) => {
  for (const field of requiredFields) {
    const fieldIsMissing = !params[field]
    const fieldIsEmpty =
      checkIsString(params[field]) &&
      validator.isEmpty(params[field], {
        ignore_whitespace: true,
      })

    if (fieldIsMissing || fieldIsEmpty) {
      return {
        missingField: field,
        ok: false,
      }
    }
  }

  return {
    ok: true,
    missingField: undefined,
  }
}
