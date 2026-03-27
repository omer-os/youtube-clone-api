import Elysia from "elysia"
import {
  listCommentsService,
  createCommentService,
  editCommentService,
  removeCommentService,
} from "./service"
import {
  listCommentsParamsSchema, listCommentsQuerySchema, listCommentsResponseSchema,
  createCommentParamsSchema, createCommentBodySchema, createCommentResponseSchema,
  editCommentParamsSchema, editCommentBodySchema, editCommentResponseSchema,
  removeCommentParamsSchema, removeCommentResponseSchema,
} from "./schema"
import {
  listCommentsDoc, createCommentDoc, editCommentDoc, removeCommentDoc,
} from "./doc"
import { CommonErrors } from "lib/errors"
import { ok, okPaginated } from "lib/response"
import { authPlugin } from "plugins/auth-plugin"

const commentRoutes = new Elysia({ prefix: "comments", tags: ["comments"] })
  .get("/:videoId", async ({ params, query }) => {
    const { comments, total } = await listCommentsService(params.videoId, query)
    return okPaginated(comments, { page: query.page, size: query.size, total })
  }, {
    params: listCommentsParamsSchema,
    query: listCommentsQuerySchema,
    response: { 200: listCommentsResponseSchema, ...CommonErrors },
    detail: listCommentsDoc,
  })
  .use(authPlugin)
  .post("/:videoId", async ({ user, params, body }) => {
    const comment = await createCommentService(user.id, params.videoId, body)
    return ok(comment)
  }, {
    params: createCommentParamsSchema,
    body: createCommentBodySchema,
    response: { 200: createCommentResponseSchema, ...CommonErrors },
    detail: createCommentDoc,
  })
  .put("/me/:id", async ({ user, params, body }) => {
    const comment = await editCommentService(user.id, params.id, body)
    return ok(comment)
  }, {
    params: editCommentParamsSchema,
    body: editCommentBodySchema,
    response: { 200: editCommentResponseSchema, ...CommonErrors },
    detail: editCommentDoc,
  })
  .delete("/me/:id", async ({ user, params }) => {
    const result = await removeCommentService(user.id, params.id)
    return ok(result)
  }, {
    params: removeCommentParamsSchema,
    response: { 200: removeCommentResponseSchema, ...CommonErrors },
    detail: removeCommentDoc,
  })

export default commentRoutes
