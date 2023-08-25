import { makeRegisterPersonsUseCase } from "@/application/use-cases/factories/make-register-person-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function registerPersonController(request: FastifyRequest, reply: FastifyReply){
  const registerBodySchema = z.object({
    cpf:  z.string().length(11),
    name:  z.string()
  })
  try{
    const registerPersonUseCase = makeRegisterPersonsUseCase()
    const { cpf, name } = registerBodySchema.parse(request.body);

    await registerPersonUseCase.execute({
      cpf, name
    })
  } catch (err) {
    return reply.status(400).send()
  }
  return reply.status(200).send()
}