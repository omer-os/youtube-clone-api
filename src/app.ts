import { Elysia } from "elysia";
import { auth } from "./lib/auth";
import { cors } from '@elysiajs/cors'
import openapi from "@elysiajs/openapi";
import { OpenAPI } from "./lib/auth-openapi";

const app = new Elysia()
  .use(
    cors({
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      credentials: true,
      allowedHeaders: ['Content-Type', 'Authorization']
    })
  )
  .mount(auth.handler)
  .get("/", () => "Hello Elysia")
  .use(openapi({
    documentation: {
      components: await OpenAPI.components,
      paths: await OpenAPI.getPaths()
    }
  }))


  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
