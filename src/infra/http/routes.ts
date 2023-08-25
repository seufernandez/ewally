import { FastifyInstance } from "fastify";
import {  registerPersonController } from "./controllers/people/register-person";
import {  getPersonController } from "./controllers/people/get-person";
import { deleteAllUsersAndRelationshipsController } from "./controllers/people/delete-all-users-and-relations";
import { createRelationshipController } from "./controllers/people/create-relationship";
import { getRecommendationsController } from "./controllers/people/get-recomendations";


export async function appRoutes(app: FastifyInstance){
  app.post('/person', registerPersonController );
  app.get('/person/:cpf',  getPersonController );
  app.delete('/clean', deleteAllUsersAndRelationshipsController);
  app.post('/relationship', createRelationshipController);
  app.get('/recommendations/:cpf', getRecommendationsController);
}