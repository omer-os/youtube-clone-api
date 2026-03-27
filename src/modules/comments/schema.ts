import { Static, t } from "elysia"
import { apiResponse, paginatedResponse } from "lib/response"
import { paginationQuerySchema } from "lib/shared/query-schemas"

export const commentModel = t.Object({
  id: t.String(),
  content: t.String(),
  videoId: t.String(),
  userId: t.String(),
  parentId: t.Nullable(t.String()),
  replyCount: t.Number(),
  user: t.Object({
    id: t.String(),
    name: t.String(),
    image: t.Nullable(t.String()),
  }),
  createdAt: t.String(),
  updatedAt: t.String(),
})

export const listCommentsParamsSchema = t.Object({ videoId: t.String() })
export const listCommentsQuerySchema = t.Composite([
  paginationQuerySchema,
  t.Object({ parentId: t.Optional(t.String()) }),
])
export const listCommentsResponseSchema = paginatedResponse(commentModel)

export const createCommentParamsSchema = t.Object({ videoId: t.String() })
export const createCommentBodySchema = t.Object({
  content: t.String({ minLength: 1 }),
  parentId: t.Optional(t.String()),
})
export const createCommentResponseSchema = apiResponse(commentModel)

export const editCommentParamsSchema = t.Object({ id: t.String() })
export const editCommentBodySchema = t.Object({
  content: t.String({ minLength: 1 }),
})
export const editCommentResponseSchema = apiResponse(commentModel)

export const removeCommentParamsSchema = t.Object({ id: t.String() })
export const removeCommentResponseSchema = apiResponse(t.Object({ id: t.String() }))

export type listCommentsQuerySchemaType = Static<typeof listCommentsQuerySchema>
export type createCommentBodySchemaType = Static<typeof createCommentBodySchema>
export type editCommentBodySchemaType = Static<typeof editCommentBodySchema>
