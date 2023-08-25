import { PersonsRepository } from "@/database/in-memory-db"
import { GetRecommendationsUseCase } from "../get-recommendations-use-case"

export function makeGetRecommendationsUseCase(){
  const getRecommendationsUseCase = new GetRecommendationsUseCase(PersonsRepository)
  
  return getRecommendationsUseCase
}