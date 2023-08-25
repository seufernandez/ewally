import { PersonsRepository } from "../../../database/in-memory-db"
import { RegisterPersonUseCase } from "../register-person"


export function makeRegisterPersonsUseCase(){
  const registerPersonUseCase = new RegisterPersonUseCase(PersonsRepository)
  
  return registerPersonUseCase
}