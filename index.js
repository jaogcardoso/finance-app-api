import 'dotenv/config'
import dotenv from 'dotenv'
import express from 'express'
import {
  makeCreateUserController,
  makeDeleteUserController,
  makeGetUserBalanceController,
  makeGetUserByIdController,
  makeLoginUserController,
  makeUpdateUserController,
} from './src/factories/controllers/user.js'
import {
  makeCreateTransactionController,
  makeDeleteTransactionController,
  makeGetTransactionByUserIdController,
  makeUpdateTransactionController,
} from './src/factories/controllers/transaction.js'

dotenv.config()

const app = express()
app.use(express.json())

app.post('/api/login', async (request, response) => {
  const loginUserController = makeLoginUserController()

  const {statusCode, body} = await loginUserController.execute(request)
  response.status(statusCode).send(body)
})

app.get('/api/users/:userId', async (request, response) => {
  const getUserByIdController = makeGetUserByIdController()

  const { statusCode, body } = await getUserByIdController.execute(request)
  response.status(statusCode).send(body)
})

app.get('/api/users/:userId/balance', async (request, response) => {
  const getUserBalanceController = makeGetUserBalanceController()

  const { statusCode, body } = await getUserBalanceController.execute(request)
  response.status(statusCode).send(body)
})

app.post('/api/users', async (request, response) => {
  const createUserController = makeCreateUserController()

  const createUserResponse = await createUserController.execute(request)

  response.status(createUserResponse.statusCode).json(createUserResponse.body)
})

app.patch('/api/users/:userId', async (request, response) => {
  const updateUserController = makeUpdateUserController()

  const { statusCode, body } = await updateUserController.execute(request)
  response.status(statusCode).send(body)
})

app.delete('/api/users/:userId', async (request, response) => {
  const deleteUserController = makeDeleteUserController()

  const { statusCode, body } = await deleteUserController.execute(request)
  response.status(statusCode).send(body)
})

app.get('/api/transactions', async (request, response) => {
  const getTransactionsByUserIdController =
    makeGetTransactionByUserIdController()

  const { statusCode, body } =
    await getTransactionsByUserIdController.execute(request)
  response.status(statusCode).send(body)
})

app.post('/api/transactions', async (request, response) => {
  const createTransactionController = makeCreateTransactionController()

  const { statusCode, body } =
    await createTransactionController.execute(request)
  response.status(statusCode).send(body)
})

app.patch('/api/transactions/:transactionId', async (request, response) => {
  const updateTransactionController = makeUpdateTransactionController()

  const { statusCode, body } =
    await updateTransactionController.execute(request)
  response.status(statusCode).send(body)
})

app.delete('/api/transactions/:transactionId', async (request, response) => {
  const deleteTransactionController = makeDeleteTransactionController()

  const { statusCode, body } =
    await deleteTransactionController.execute(request)
  response.status(statusCode).send(body)
})

app.listen(process.env.PORT, () => {
  console.log('🚀 Server running on')
})
