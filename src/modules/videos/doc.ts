import { type DocumentDecoration } from "elysia"

export const listVideosDoc: DocumentDecoration = {
  description: "list all public videos",
  operationId: "listVideos",
  summary: "list",
}

export const showVideoDoc: DocumentDecoration = {
  description: "get a video by id",
  operationId: "showVideo",
  summary: "show",
}

export const myVideosDoc: DocumentDecoration = {
  description: "list the authenticated user's channel videos",
  operationId: "myVideos",
  summary: "myList",
}

export const createVideoDoc: DocumentDecoration = {
  description: "upload a video to the authenticated user's channel",
  operationId: "createVideo",
  summary: "create",
}

export const editVideoDoc: DocumentDecoration = {
  description: "update a video owned by the authenticated user",
  operationId: "editVideo",
  summary: "edit",
}

export const removeVideoDoc: DocumentDecoration = {
  description: "delete a video owned by the authenticated user",
  operationId: "removeVideo",
  summary: "remove",
}

export const recordViewDoc: DocumentDecoration = {
  description: "record a view for a video by the authenticated user",
  operationId: "recordView",
  summary: "recordView",
}
