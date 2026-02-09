import validator from 'validator'
import { badRequest , notFound} from './http.js'

export const checkIfValueIsValid = (value) => {
  if (typeof value != 'number') {
    return false
  }
  return validator.isCurrency(value.toFixed(2), {
    digits_after_decimal: [2],
    allow_negatives: false,
    decimal_separator: '.',
  })
}

export const checkIfTypeIsValid = (type) => {
  return ['EARNING', 'EXPENSE', 'INVESTMENT'].includes(type.toUpperCase())
}

export const transactionNotFoundResponse = () =>
  notFound({
    message: 'Transaction not found',
  })

export const invalidValueResponse = () => {
  return badRequest({
    message: 'The value must be a valid currency',
  })
}

export const invalidTypeResponse = () => {
  return badRequest({
    message: 'The type must be valid',
  })
}
