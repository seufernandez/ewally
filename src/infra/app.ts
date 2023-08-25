import { appRoutes } from "@/infra/http/routes"
import fastify from "fastify"

export const app = fastify()

app.register(appRoutes, {
  prefix: "/"
})
