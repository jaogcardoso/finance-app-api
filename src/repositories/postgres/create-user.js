import { PostgresHelper } from '../../db/postgres/client'

export class PostgresCreateUserRepository {
  async execute(createUserParams) {
    //create user in postgres
    const results = await PostgresHelper.query(
      'INSERT INTO users (ID, first_name, last_name, email, passaword) VALUES ($1, $2, $3, $4, $5)',
      [
        createUserParams.ID,
        createUserParams.first_name,
        createUserParams.last_name,
        createUserParams.email,
        createUserParams.password,
      ],
    )
    return results[0]
  }
}
