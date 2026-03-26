import Elysia from "elysia";
import { listChannelsService } from "./service";
import { listChannelsQuerySchema, listChannelsResponseSchema } from "./schema";
import { listChannelsDoc } from "./doc";
import { CommonErrors } from "lib/errors";

const channelRoutes = new Elysia({
  prefix: "channels",
  tags: ["channels"]
})
  .get("/", async ({ query }) => {
    const channels = await listChannelsService(query)
    return channels
  }, {
    query: listChannelsQuerySchema,
    response: {
      200: listChannelsResponseSchema,
      ...CommonErrors,
    },
    detail: listChannelsDoc
  })

export default channelRoutes
