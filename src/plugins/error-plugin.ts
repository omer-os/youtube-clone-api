import Elysia, { ValidationError } from "elysia"
import { AppError } from "../lib/errors"
import { fail } from "../lib/response"

export const errorPlugin = new Elysia({ name: "error-plugin" })
  .onError({ as: "global" }, ({ error, set }) => {
    if (error instanceof AppError) {
      set.status = error.statusCode
      return fail(error.message, error.code)
    }

    if (error instanceof ValidationError) {
      set.status = error.status
      return fail(error.all.map(i => (i.summary)).join(", "), error.code)
    }

    set.status = 500
    return fail("Internal server error")
  })
