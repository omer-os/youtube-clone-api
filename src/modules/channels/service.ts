import { db } from "lib/db"
import { ConflictError, NotFoundError } from "lib/errors"
import { uploadToR2, deleteFromR2 } from "lib/r2"
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

  const avatarUrl = data.avatar ? (await uploadToR2(data.avatar, "avatars")).url : null
  const bannerUrl = data.banner ? (await uploadToR2(data.banner, "banners")).url : null

  const channel = await db.channel.create({
    data: { name: data.name, description: data.description ?? null, avatarUrl, bannerUrl, userId },
  })
  return serializeDates(channel)
}

export const editChannelService = async (userId: string, data: editChannelBodySchemaType) => {
  const channel = await db.channel.findUnique({ where: { userId } })
  if (!channel) throw new NotFoundError("Channel not found")

  const updateData: Record<string, any> = {}

  if (data.name !== undefined) updateData.name = data.name
  if (data.description !== undefined) updateData.description = data.description

  if (data.avatar) {
    if (channel.avatarUrl) await deleteFromR2(channel.avatarUrl)
    updateData.avatarUrl = (await uploadToR2(data.avatar, "avatars")).url
  }

  if (data.banner) {
    if (channel.bannerUrl) await deleteFromR2(channel.bannerUrl)
    updateData.bannerUrl = (await uploadToR2(data.banner, "banners")).url
  }

  const updated = await db.channel.update({ where: { userId }, data: updateData })
  return serializeDates(updated)
}

export const removeChannelService = async (userId: string) => {
  const channel = await db.channel.findUnique({ where: { userId } })

  if (!channel) throw new NotFoundError("Channel not found")
  if (channel.avatarUrl) await deleteFromR2(channel.avatarUrl)
  if (channel.bannerUrl) await deleteFromR2(channel.bannerUrl)

  await db.channel.delete({ where: { userId } })
  return { id: channel.id }
}
