import {
  CreateUserController,
  DeleteUserController,
  GetUserBalanceController,
  GetUserByIdController,
  LoginUserController,
  UpdateUserController,
} from '../../controllers/index.js'
import {
  PostgresCreateUserRepository,
  PostgresDeleteUserRepository,
  PostgresGetUserBalanceRepository,
  PostgresGetUserByEmailRepository,
  PostgresGetUserByIdRepository,
  PostgresUpdateUserRepository,
} from '../../repositories/postgres/index.js'
import {
  CreateUserUseCase,
  DeleteUserUseCase,
  GetUserBalanceUseCase,
  GetUserByIdUseCase,
  LoginUserUseCase,
  UpdateUserUseCase,
} from '../../use-cases/index.js'

export const makeGetUserByIdController = () => {
  const getUserByIdRepository = new PostgresGetUserByIdRepository()

  const getUserByIdUseCase = new GetUserByIdUseCase(getUserByIdRepository)

  const getUserByIdController = new GetUserByIdController(getUserByIdUseCase)

  return getUserByIdController
}

export const makeCreateUserController = () => {
  const getUserByEmailRepository = new PostgresGetUserByEmailRepository()
  const createUserRepository = new PostgresCreateUserRepository()

  const createUserUseCase = new CreateUserUseCase(
    getUserByEmailRepository,
    createUserRepository,
  )

  const createUserController = new CreateUserController(createUserUseCase)

  return createUserController
}

export const makeUpdateUserController = () => {
  const getUserByEmailRepository = new PostgresGetUserByEmailRepository()

  const updateUserRepository = new PostgresUpdateUserRepository()

  const updateUserUseCase = new UpdateUserUseCase(
    getUserByEmailRepository,
    updateUserRepository,
  )

  const updateUserController = new UpdateUserController(updateUserUseCase)

  return updateUserController
}

export const makeDeleteUserController = () => {
  const deleteUserRepository = new PostgresDeleteUserRepository()

  const deleteUserUseCase = new DeleteUserUseCase(deleteUserRepository)

  const deleteUserController = new DeleteUserController(deleteUserUseCase)

  return deleteUserController
}

export const makeGetUserBalanceController = () => {
  const getUserBalanceRepository = new PostgresGetUserBalanceRepository()
  const getUserByIdRepository = new PostgresGetUserByIdRepository()

  const getUserBalanceUseCase = new GetUserBalanceUseCase(getUserBalanceRepository, getUserByIdRepository)

  const getUserBalanceController = new GetUserBalanceController (getUserBalanceUseCase)

  return getUserBalanceController
}

export const makeLoginUserController = () => {
  const getUserByEmailRepository = new PostgresGetUserByEmailRepository()
  
  const loginUserUseCase = new LoginUserUseCase(getUserByEmailRepository)

  const loginUserController = new LoginUserController(loginUserUseCase)

  return loginUserController
}