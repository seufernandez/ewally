import { PersonsRepository } from "@/database/in-memory-db"
import { CreateRelationshipUseCase } from "../create-relationship-use-case"

export function makeCreateRelationshipUseCase(){
  const createRelationshipUseCase = new CreateRelationshipUseCase(PersonsRepository)
  
  return createRelationshipUseCase
}