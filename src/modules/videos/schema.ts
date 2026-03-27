import { Static, t } from "elysia"
import { ApiResponseType, apiResponse, paginatedResponse } from "lib/response"

const visibilityEnum = t.Union([t.Literal("PUBLIC"), t.Literal("PRIVATE"), t.Literal("UNLISTED")])
const videoFile = t.File({ maxSize: "500m", type: ["video/mp4", "video/webm", "video/quicktime"] })
const imageFile = t.File({ maxSize: "5m", type: ["image/png", "image/jpeg", "image/webp"] })

export const videoModel = t.Object({
  id: t.String(),
  channelId: t.String(),
  title: t.String(),
  description: t.Nullable(t.String()),
  videoUrl: t.String(),
  thumbnailUrl: t.Nullable(t.String()),
  visibility: visibilityEnum,
  views: t.Number(),
  createdAt: t.String(),
  updatedAt: t.String(),
})

export const listVideosQuerySchema = t.Object({
  page: t.Number({ minimum: 1, default: 1 }),
  size: t.Number({ minimum: 1, maximum: 100, default: 20 }),
  channelId: t.Optional(t.String()),
})
export const listVideosResponseSchema = paginatedResponse(videoModel)

export const showVideoParamsSchema = t.Object({ id: t.String() })
export const showVideoResponseSchema = apiResponse(videoModel)

export const myVideosQuerySchema = t.Object({
  page: t.Number({ minimum: 1, default: 1 }),
  size: t.Number({ minimum: 1, maximum: 100, default: 20 }),
})
export const myVideosResponseSchema = paginatedResponse(videoModel)

export const createVideoBodySchema = t.Object({
  title: t.String(),
  description: t.Optional(t.Nullable(t.String())),
  visibility: t.Optional(visibilityEnum),
  video: videoFile,
  thumbnail: t.Optional(imageFile),
})
export const createVideoResponseSchema = apiResponse(videoModel)

export const editVideoParamsSchema = t.Object({ id: t.String() })
export const editVideoBodySchema = t.Object({
  title: t.Optional(t.String()),
  description: t.Optional(t.Nullable(t.String())),
  visibility: t.Optional(visibilityEnum),
  thumbnail: t.Optional(imageFile),
})
export const editVideoResponseSchema = apiResponse(videoModel)

export const removeVideoParamsSchema = t.Object({ id: t.String() })
export const removeVideoResponseSchema = apiResponse(t.Object({ id: t.String() }))

export const recordViewParamsSchema = t.Object({ id: t.String() })
export const recordViewResponseSchema = apiResponse(t.Object({ views: t.Number() }))

export type listVideosQuerySchemaType = Static<typeof listVideosQuerySchema>
export type myVideosQuerySchemaType = Static<typeof myVideosQuerySchema>
export type createVideoBodySchemaType = Static<typeof createVideoBodySchema>
export type editVideoBodySchemaType = Static<typeof editVideoBodySchema>
