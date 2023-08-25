import { InMemoryUsersRepository } from "../application/repositories/in-memory-users-repsitory";

export function createRepository() {
  return new InMemoryUsersRepository();
}

export const PersonsRepository = createRepository()
