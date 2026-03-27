import { Static, t } from "elysia"
import { ApiResponseType, apiResponse, paginatedResponse } from "lib/response"
import { paginationQuerySchema } from "lib/shared/query-schemas"

export const channelModel = t.Object({
  id: t.String(),
  name: t.String(),
  description: t.Nullable(t.String()),
  avatarUrl: t.Nullable(t.String()),
  bannerUrl: t.Nullable(t.String()),
  userId: t.String(),
  createdAt: t.String(),
  updatedAt: t.String(),
})

export const listChannelsQuerySchema = paginationQuerySchema
export const listChannelsResponseSchema = paginatedResponse(channelModel)

export const showChannelParamsSchema = t.Object({
  id: t.String(),
})
export const showChannelResponseSchema = apiResponse(channelModel)

const imageFile = t.File({ maxSize: "5m", type: ["image/png", "image/jpeg", "image/webp"] })

export const createChannelBodySchema = t.Object({
  name: t.String(),
  description: t.Optional(t.Nullable(t.String())),
  avatar: t.Optional(imageFile),
  banner: t.Optional(imageFile),
})
export const createChannelResponseSchema = apiResponse(channelModel)

export const editChannelBodySchema = t.Object({
  name: t.Optional(t.String()),
  description: t.Optional(t.Nullable(t.String())),
  avatar: t.Optional(imageFile),
  banner: t.Optional(imageFile),
})
export const editChannelResponseSchema = apiResponse(channelModel)

export const removeChannelResponseSchema = apiResponse(t.Object({ id: t.String() }))

export const myChannelResponseSchema = apiResponse(channelModel)

export type listChannelsQuerySchemaType = Static<typeof listChannelsQuerySchema>
export type listChannelsResponseSchemaType = ApiResponseType<typeof listChannelsResponseSchema>
export type createChannelBodySchemaType = Static<typeof createChannelBodySchema>
export type editChannelBodySchemaType = Static<typeof editChannelBodySchema>
