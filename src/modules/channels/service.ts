import { db } from "lib/db"
import { PaginationQueryTypes } from "lib/shared/query-schemas"
import { serializeDates } from "lib/shared/serialize"

export const listChannelsService = async (query: PaginationQueryTypes) => {
  const [channels, total] = await Promise.all([
    db.channel.findMany({
      skip: (query.page - 1) * query.size,
      take: query.size,
      orderBy: { createdAt: "desc" },
    }).then(rows => rows.map(serializeDates)),
    db.channel.count(),
  ])
  return { channels, total }
}
