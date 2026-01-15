import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'

export class CreateUserUseCase {
  async execute(createUserParams) {
    //TODO: verificar se o e-mail ja esta em uso

    // gerar id do usuario
    const userId = uuidv4()

    // criptografar a senha
    const hashedPassword = await bcrypt.hash(createUserParams.password, 10)

    // inserir o usuario no banco de dados
    const user = {
        ...createUserParams,
      id: userId,
      password: hashedPassword,
    }
    //chamar o repositorio
    const PostgresCreateUserRepository = new PostgresCreateUserRepository()
    const createdUser = await PostgresCreateUserRepository.execute(user)

    return createdUser

  }
}
