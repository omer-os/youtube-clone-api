import Elysia from "elysia";
import { listChannelsService, showChannelService, myChannelService, createChannelService, editChannelService, removeChannelService } from "./service";
import { listChannelsQuerySchema, listChannelsResponseSchema, showChannelParamsSchema, showChannelResponseSchema, myChannelResponseSchema, createChannelBodySchema, createChannelResponseSchema, editChannelBodySchema, editChannelResponseSchema, removeChannelResponseSchema } from "./schema";
import { listChannelsDoc, showChannelDoc, myChannelDoc, createChannelDoc, editChannelDoc, removeChannelDoc } from "./doc";
import { CommonErrors } from "lib/errors";
import { ok, okPaginated } from "lib/response";
import { authPlugin } from "plugins/auth-plugin";

const channelRoutes = new Elysia({
  prefix: "channels",
  tags: ["channels"],
})
  .get("/", async ({ query }) => {
    const { channels, total } = await listChannelsService(query)
    return okPaginated(channels, { page: query.page, size: query.size, total })
  }, {
    query: listChannelsQuerySchema,
    response: { 200: listChannelsResponseSchema, ...CommonErrors },
    detail: listChannelsDoc,
  })
  .get("/show/:id", async ({ params }) => {
    const channel = await showChannelService(params.id)
    return ok(channel)
  }, {
    params: showChannelParamsSchema,
    response: { 200: showChannelResponseSchema, ...CommonErrors },
    detail: showChannelDoc,
  })
  .use(authPlugin)
  .get("/me", async ({ user }) => {
    const channel = await myChannelService(user.id)
    return ok(channel)
  }, {
    response: { 200: myChannelResponseSchema, ...CommonErrors },
    detail: myChannelDoc,
  })
  .post("/me", async ({ body, user }) => {
    const channel = await createChannelService(user.id, body)
    return ok(channel)
  }, {
    body: createChannelBodySchema,
    response: { 200: createChannelResponseSchema, ...CommonErrors },
    detail: createChannelDoc,
  })
  .put("/me", async ({ body, user }) => {
    const channel = await editChannelService(user.id, body)
    return ok(channel)
  }, {
    body: editChannelBodySchema,
    response: { 200: editChannelResponseSchema, ...CommonErrors },
    detail: editChannelDoc,
  })
  .delete("/me", async ({ user }) => {
    const result = await removeChannelService(user.id)
    return ok(result)
  }, {
    response: { 200: removeChannelResponseSchema, ...CommonErrors },
    detail: removeChannelDoc,
  })

export default channelRoutes
