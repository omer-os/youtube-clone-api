import { db } from "lib/db"
import { ConflictError, NotFoundError } from "lib/errors"
import { PaginationQueryTypes } from "lib/shared/query-schemas"
import { serializeDates } from "lib/shared/serialize"
import { createChannelBodySchemaType, editChannelBodySchemaType } from "./schema"

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

export const showChannelService = async (id: string) => {
  const channel = await db.channel.findUnique({ where: { id } })
  if (!channel) throw new NotFoundError("Channel not found")
  return serializeDates(channel)
}

export const myChannelService = async (userId: string) => {
  const channel = await db.channel.findUnique({ where: { userId } })
  if (!channel) throw new NotFoundError("Channel not found")
  return serializeDates(channel)
}

export const createChannelService = async (userId: string, data: createChannelBodySchemaType) => {
  const existing = await db.channel.findUnique({ where: { userId } })
  if (existing) throw new ConflictError("Channel already exists")
  const channel = await db.channel.create({
    data: { ...data, userId },
  })
  return serializeDates(channel)
}

export const editChannelService = async (userId: string, data: editChannelBodySchemaType) => {
  const channel = await db.channel.findUnique({ where: { userId } })
  if (!channel) throw new NotFoundError("Channel not found")
  const updated = await db.channel.update({ where: { userId }, data })
  return serializeDates(updated)
}

export const removeChannelService = async (userId: string) => {
  const channel = await db.channel.findUnique({ where: { userId } })
  if (!channel) throw new NotFoundError("Channel not found")
  await db.channel.delete({ where: { userId } })
  return { id: channel.id }
}
