import { Static, t } from "elysia";

export const paginationQuerySchema = t.Object({
  page: t.Number({ minimum: 1, default: 1 }),
  size: t.Number({ minimum: 1, maximum: 100, default: 20 }),
})

export type PaginationQueryTypes = Static<typeof paginationQuerySchema>
