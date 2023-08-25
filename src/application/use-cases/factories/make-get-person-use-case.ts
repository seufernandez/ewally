import { PersonsRepository } from "../../../database/in-memory-db"
import { GetPersonUseCase } from "../get-person"


export function makeGetPersonUseCase(){
  const getPersonUseCase = new GetPersonUseCase(PersonsRepository)
  
  return getPersonUseCase
}