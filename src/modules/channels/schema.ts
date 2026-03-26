import { Static, t } from "elysia";
import { apiResponse, ApiResponseType, paginatedResponse } from "lib/response";
import { paginationQuerySchema } from "lib/shared/query-schemas";

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

export const listChannelsQuerySchema = paginationQuerySchema
export const listChannelsResponseSchema = paginatedResponse(channelModel)

export type listChannelsQuerySchemaType = Static<typeof listChannelsQuerySchema>
export type listChannelsResponseSchemaType = ApiResponseType<typeof listChannelsResponseSchema>
