import Elysia from "elysia";
import { listChannelsService } from "./service";
import { listChannelsQuerySchema, listChannelsResponseSchema } from "./schema";
import { listChannelsDoc } from "./doc";
import { CommonErrors } from "lib/errors";
import { okPaginated } from "lib/response";

const channelRoutes = new Elysia({
  prefix: "channels",
  tags: ["channels"]
})
  .get("/", async ({ query }) => {
    const { channels, total } = await listChannelsService(query)
    return okPaginated(
      channels,
      { page: query.page, size: query.size, total }
    )
  }, {
    query: listChannelsQuerySchema,
    response: {
      200: listChannelsResponseSchema,
      ...CommonErrors,
    },
    detail: listChannelsDoc
  })

export default channelRoutes
