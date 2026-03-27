import { type DocumentDecoration } from "elysia"

export const listCommentsDoc: DocumentDecoration = {
  description: "list comments",
  operationId: "listComments",
  summary: "list",
}

export const createCommentDoc: DocumentDecoration = {
  description: "post a comment on a video",
  operationId: "createComment",
  summary: "create",
}

export const editCommentDoc: DocumentDecoration = {
  description: "edit an owned comment",
  operationId: "editComment",
  summary: "edit",
}

export const removeCommentDoc: DocumentDecoration = {
  description: "delete an owned comment",
  operationId: "removeComment",
  summary: "remove",
}
