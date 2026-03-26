import { Static, t } from "elysia";
import { apiResponse, ApiResponseType } from "lib/response";

export const channelModel = t.Object({
  id: t.String(),
  name: t.String(),
  description: t.Nullable(t.String()),
  avatarUrl: t.Nullable(t.String()),
  bannerUrl: t.Nullable(t.String()),
  userId: t.String(),
  createdAt: t.String(),
  updatedAt: t.String()
})

export const listChannelsQuerySchema = t.Object({
  page: t.Number(),
  size: t.Number(),
})

export const listChannelsResponseSchema = apiResponse(t.Array(channelModel))

export type listChannelsQuerySchemaType = Static<typeof listChannelsQuerySchema>
export type listChannelsResponseSchemaType = ApiResponseType<typeof listChannelsResponseSchema>
