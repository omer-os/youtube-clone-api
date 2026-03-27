import Elysia from "elysia"
import {
  listVideosService, showVideoService, myVideosService,
  createVideoService, editVideoService, removeVideoService,
  recordViewService,
} from "./service"
import {
  listVideosQuerySchema, listVideosResponseSchema,
  showVideoParamsSchema, showVideoResponseSchema,
  myVideosQuerySchema, myVideosResponseSchema,
  createVideoBodySchema, createVideoResponseSchema,
  editVideoParamsSchema, editVideoBodySchema, editVideoResponseSchema,
  removeVideoParamsSchema, removeVideoResponseSchema,
  recordViewParamsSchema, recordViewResponseSchema,
} from "./schema"
import {
  listVideosDoc, showVideoDoc, myVideosDoc,
  createVideoDoc, editVideoDoc, removeVideoDoc,
  recordViewDoc,
} from "./doc"
import { CommonErrors } from "lib/errors"
import { ok, okPaginated } from "lib/response"
import { authPlugin } from "plugins/auth-plugin"

const videoRoutes = new Elysia({ prefix: "videos", tags: ["videos"] })
  .get("/", async ({ query }) => {
    const { videos, total } = await listVideosService(query)
    return okPaginated(videos, { page: query.page, size: query.size, total })
  }, {
    query: listVideosQuerySchema,
    response: { 200: listVideosResponseSchema, ...CommonErrors },
    detail: listVideosDoc,
  })
  .get("/show/:id", async ({ params }) => {
    const video = await showVideoService(params.id)
    return ok(video)
  }, {
    params: showVideoParamsSchema,
    response: { 200: showVideoResponseSchema, ...CommonErrors },
    detail: showVideoDoc,
  })
  .use(authPlugin)
  .get("/me", async ({ user, query }) => {
    const { videos, total } = await myVideosService(user.id, query)
    return okPaginated(videos, { page: query.page, size: query.size, total })
  }, {
    query: myVideosQuerySchema,
    response: { 200: myVideosResponseSchema, ...CommonErrors },
    detail: myVideosDoc,
  })
  .post("/me", async ({ user, body }) => {
    const video = await createVideoService(user.id, body)
    return ok(video)
  }, {
    body: createVideoBodySchema,
    response: { 200: createVideoResponseSchema, ...CommonErrors },
    detail: createVideoDoc,
  })
  .put("/me/:id", async ({ user, params, body }) => {
    const video = await editVideoService(user.id, params.id, body)
    return ok(video)
  }, {
    params: editVideoParamsSchema,
    body: editVideoBodySchema,
    response: { 200: editVideoResponseSchema, ...CommonErrors },
    detail: editVideoDoc,
  })
  .delete("/me/:id", async ({ user, params }) => {
    const result = await removeVideoService(user.id, params.id)
    return ok(result)
  }, {
    params: removeVideoParamsSchema,
    response: { 200: removeVideoResponseSchema, ...CommonErrors },
    detail: removeVideoDoc,
  })
  .post("/show/:id/view", async ({ user, params }) => {
    const result = await recordViewService(user.id, params.id)
    return ok(result)
  }, {
    params: recordViewParamsSchema,
    response: { 200: recordViewResponseSchema, ...CommonErrors },
    detail: recordViewDoc,
  })

export default videoRoutes
