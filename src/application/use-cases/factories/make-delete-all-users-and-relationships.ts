import { PersonsRepository } from "@/database/in-memory-db"
import { DeleteAllUsersAndRelationshipsUseCase } from "../delete-all-users-and-relationships-use-case"

export function makeDeleteAllUsersAndRelationshipsUseCase(){
  const deleteAllUsersAndRelationshipsUseCase = new DeleteAllUsersAndRelationshipsUseCase(PersonsRepository)
  
  return deleteAllUsersAndRelationshipsUseCase
}