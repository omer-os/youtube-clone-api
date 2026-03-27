import { type DocumentDecoration } from "elysia"

export const listChannelsDoc: DocumentDecoration = {
  description: "list all channels",
  operationId: "listChannels",
  summary: "list",
}

export const showChannelDoc: DocumentDecoration = {
  description: "get a channel by id",
  operationId: "showChannel",
  summary: "show",
}

export const myChannelDoc: DocumentDecoration = {
  description: "get the authenticated user's channel",
  operationId: "myChannel",
  summary: "me",
}

export const createChannelDoc: DocumentDecoration = {
  description: "create a channel for the authenticated user",
  operationId: "createChannel",
  summary: "create",
}

export const editChannelDoc: DocumentDecoration = {
  description: "update the authenticated user's channel",
  operationId: "editChannel",
  summary: "edit",
}

export const removeChannelDoc: DocumentDecoration = {
  description: "delete the authenticated user's channel",
  operationId: "removeChannel",
  summary: "remove",
}
