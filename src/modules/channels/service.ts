import { db } from "lib/db"
import {
  type listChannelsQuerySchemaType
} from "./schema"
import { ok } from "lib/response"

export const listChannelsService = async (query: listChannelsQuerySchemaType) => {
  const channels = await db.channel.findMany({
    skip: (query.page - 1) * query.size,
    take: query.size,
    orderBy: {
      createdAt: "desc"
    }
  })

  return ok([...channels.map(i => ({
    ...i,
    createdAt: i.createdAt.toISOString(),
    updatedAt: i.createdAt.toISOString()
  }))])
}
