import { app } from "@/infra/app";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import request from 'supertest'
interface Person {
  cpf: string;
  name: string;
}

interface Relationship {
  cpf1: string;
  cpf2: string;
}

async function createAllPeopleAndRelationsToRecommendationTest(){
  const persons = [
    { cpf: '11111111111', name: 'Joaozinho' },
    { cpf: '22222222222', name: 'Joaozinho' },
    { cpf: '33333333333', name: 'Joaozinho' },
    { cpf: '44444444444', name: 'Joaozinho' },
    { cpf: '55555555555', name: 'Joaozinho' }
  ];
  
  const relationships = [
    { cpf1: '11111111111', cpf2: '22222222222' },
    { cpf1: '11111111111', cpf2: '33333333333' },
    { cpf1: '33333333333', cpf2: '55555555555' },
    { cpf1: '33333333333', cpf2: '44444444444' },
    { cpf1: '22222222222', cpf2: '44444444444' }
  ];
  
  const createPerson = async (person: Person) => {
    await request(app.server)
      .post('/person')
      .send(person);
  };
  
  const createRelationship = async (relationship: Relationship) => {
    await request(app.server)
      .post('/relationship')
      .send(relationship);
  };
  
  for (const person of persons) {
    await createPerson(person);
  }
  
  for (const relationship of relationships) {
    await createRelationship(relationship);
  }
}

describe("People's Management",() => {
  beforeAll(async ()=> {
      await app.ready()
  })

  afterAll(async ()=> {
    await app.close()
  })
  beforeEach(async ()=> {
    await request(app.server)
      .delete('/clean');
  })

  it('user can register a new person', async () => {
    const response = await request(app.server)
    .post('/person')
    .send({
      cpf: '12345678999',
      name: 'Joaozinho'
    })
    
    expect(response.statusCode).toBe(200)
  })

  it('should return status code 400 if user is already registered', async () => {
    const response = await request(app.server)
      .post('/person')
      .send({
        cpf: '12345678999',
        name: 'Joaozinho'
      });
      
    expect(response.statusCode).toBe(400);
  });
  

  it('should retrieve a person by CPF', async () => {
    const cpf = '12345678999';
    const response = await request(app.server)
      .get(`/person/${cpf}`);
    
    expect(response.body).toEqual({
      cpf: '12345678999',
      name: 'Joaozinho'
    });
    expect(response.statusCode).toBe(200)
  });

  it('should clean all data in memory', async () => {
    const response = await request(app.server)
      .delete('/clean');
    
    expect(response.statusCode).toBe(204);
  });
    

  it('should create a relationship between two people', async () => {
    await request(app.server)
      .post('/person')
      .send({
        cpf: '11111111111',
        name: 'Joaozinho'
    })

    await request(app.server)
    .post('/person')
    .send({
      cpf: '22222222222',
      name: 'Joaozinho'
    })
    
    const response = await request(app.server)
      .post('/relationship')
      .send({
        cpf1: '11111111111',
        cpf2: '22222222222'
    });

    expect(response.statusCode).toBe(200);
  });

  it('should return status code 404 if one of the users does not exist', async () => {
    await request(app.server)
      .post('/person')
      .send({
        cpf: '11111111111',
        name: 'Joaozinho'
      });
  
    const response = await request(app.server)
      .post('/relationship')
      .send({
        cpf1: '11111111111',
        cpf2: '99999999999' 
      });
  
    expect(response.statusCode).toBe(404);
  });
  

  it('should retrieve recommendations for a person', async () => {

    await createAllPeopleAndRelationsToRecommendationTest()

    const cpf = '11111111111';
    const response = await request(app.server)
      .get(`/recommendations/${cpf}`);

      expect(response.body).toStrictEqual(['44444444444', '55555555555'])
  });

})