import { Elysia } from "elysia"
import { auth } from "../lib/auth"
import { UnauthorizedError } from "../lib/errors"

export const authPlugin = new Elysia({ name: "authPlugin" })
  .derive(async ({ request }) => {
    const session = await auth.api.getSession({
      headers: request.headers,
    })
    if (!session) {
      throw new UnauthorizedError()
    }
    return { user: session.user, session: session.session }
  }).as("scoped")
