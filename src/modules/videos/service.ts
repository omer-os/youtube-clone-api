import { db } from "lib/db"
import { ForbiddenError, NotFoundError } from "lib/errors"
import { uploadToR2, deleteFromR2 } from "lib/r2"
import { serializeDates } from "lib/shared/serialize"
import {
  listVideosQuerySchemaType,
  myVideosQuerySchemaType,
  createVideoBodySchemaType,
  editVideoBodySchemaType,
} from "./schema"
import { Prisma } from "../../../prisma/generated/browser"


const videoInclude = { _count: { select: { views: true } } } satisfies Prisma.VideoInclude

type VideoWithCount = Prisma.VideoGetPayload<{ include: typeof videoInclude }>

const mapVideo = (video: VideoWithCount) => {
  const { _count, ...rest } = video
  return { ...serializeDates(rest), views: _count.views }
}

export const listVideosService = async (query: listVideosQuerySchemaType) => {
  const where = {
    visibility: "PUBLIC" as const,
    ...(query.channelId ? { channelId: query.channelId } : {}),
  }
  const [videos, total] = await Promise.all([
    db.video.findMany({
      where,
      include: videoInclude,
      skip: (query.page - 1) * query.size,
      take: query.size,
      orderBy: { createdAt: "desc" },
    }).then(rows => rows.map(mapVideo)),
    db.video.count({ where }),
  ])
  return { videos, total }
}

export const showVideoService = async (id: string) => {
  const video = await db.video.findUnique({ where: { id }, include: videoInclude })
  if (!video) throw new NotFoundError("Video not found")
  return mapVideo(video)
}

export const myVideosService = async (userId: string, query: myVideosQuerySchemaType) => {
  const channel = await db.channel.findUnique({ where: { userId } })
  if (!channel) throw new NotFoundError("Channel not found")
  const where = { channelId: channel.id }
  const [videos, total] = await Promise.all([
    db.video.findMany({
      where,
      include: videoInclude,
      skip: (query.page - 1) * query.size,
      take: query.size,
      orderBy: { createdAt: "desc" },
    }).then(rows => rows.map(mapVideo)),
    db.video.count({ where }),
  ])
  return { videos, total }
}

export const createVideoService = async (userId: string, data: createVideoBodySchemaType) => {
  const channel = await db.channel.findUnique({ where: { userId } })
  if (!channel) throw new NotFoundError("Channel not found")

  const videoUrl = (await uploadToR2(data.video, "videos")).url
  const thumbnailUrl = data.thumbnail ? (await uploadToR2(data.thumbnail, "thumbnails")).url : null

  const video = await db.video.create({
    data: {
      channelId: channel.id,
      title: data.title,
      description: data.description ?? null,
      visibility: data.visibility ?? "PUBLIC",
      videoUrl,
      thumbnailUrl,
    },
    include: videoInclude,
  })
  return mapVideo(video)
}

export const editVideoService = async (userId: string, videoId: string, data: editVideoBodySchemaType) => {
  const video = await db.video.findUnique({ where: { id: videoId }, include: { channel: true } })
  if (!video) throw new NotFoundError("Video not found")
  if (video.channel.userId !== userId) throw new ForbiddenError()

  const updateData: Record<string, any> = {}
  if (data.title !== undefined) updateData.title = data.title
  if (data.description !== undefined) updateData.description = data.description
  if (data.visibility !== undefined) updateData.visibility = data.visibility

  if (data.thumbnail) {
    if (video.thumbnailUrl) await deleteFromR2(video.thumbnailUrl)
    updateData.thumbnailUrl = (await uploadToR2(data.thumbnail, "thumbnails")).url
  }

  const updated = await db.video.update({ where: { id: videoId }, data: updateData, include: videoInclude })
  return mapVideo(updated)
}

export const removeVideoService = async (userId: string, videoId: string) => {
  const video = await db.video.findUnique({ where: { id: videoId }, include: { channel: true } })
  if (!video) throw new NotFoundError("Video not found")
  if (video.channel.userId !== userId) throw new ForbiddenError()

  await deleteFromR2(video.videoUrl)
  if (video.thumbnailUrl) await deleteFromR2(video.thumbnailUrl)

  await db.video.delete({ where: { id: videoId } })
  return { id: video.id }
}

export const recordViewService = async (userId: string, videoId: string) => {
  const video = await db.video.findUnique({ where: { id: videoId } })
  if (!video) throw new NotFoundError("Video not found")

  await db.videoView.upsert({
    where: { videoId_userId: { videoId, userId } },
    create: { videoId, userId },
    update: {},
  })

  const views = await db.videoView.count({ where: { videoId } })
  return { views }
}
