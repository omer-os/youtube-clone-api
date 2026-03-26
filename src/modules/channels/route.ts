import Elysia from "elysia";
import { listChannelsService } from "./service";
import { listChannelsQuerySchema, listChannelsResponseSchema } from "./schema";
import { apiError } from "lib/response";
import { listChannelsDoc } from "./doc";

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
      400: apiError
    },
    detail: listChannelsDoc
  })

export default channelRoutes
