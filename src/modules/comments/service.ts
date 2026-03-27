import { db } from "lib/db"
import { ForbiddenError, NotFoundError } from "lib/errors"
import { serializeDates } from "lib/shared/serialize"
import { Prisma } from "../../../prisma/generated/browser"
import {
  listCommentsQuerySchemaType,
  createCommentBodySchemaType,
  editCommentBodySchemaType,
} from "./schema"

const commentInclude = {
  user: { select: { id: true, name: true, image: true } },
  _count: { select: { replies: true } },
} satisfies Prisma.CommentInclude

type CommentWithIncludes = Prisma.CommentGetPayload<{ include: typeof commentInclude }>

const mapComment = (c: CommentWithIncludes) => {
  const { _count, user, ...rest } = c
  return { ...serializeDates(rest), replyCount: _count.replies, user }
}

export const listCommentsService = async (videoId: string, query: listCommentsQuerySchemaType) => {
  const video = await db.video.findUnique({ where: { id: videoId } })
  if (!video) throw new NotFoundError("Video not found")

  const where = {
    videoId,
    parentId: query.parentId ?? null,
  }

  const [comments, total] = await Promise.all([
    db.comment.findMany({
      where,
      include: commentInclude,
      skip: (query.page - 1) * query.size,
      take: query.size,
      orderBy: { createdAt: "desc" },
    }).then(rows => rows.map(mapComment)),
    db.comment.count({ where }),
  ])
  return { comments, total }
}

export const createCommentService = async (
  userId: string,
  videoId: string,
  data: createCommentBodySchemaType
) => {
  const video = await db.video.findUnique({ where: { id: videoId } })
  if (!video) throw new NotFoundError("Video not found")

  if (data.parentId) {
    const parent = await db.comment.findUnique({ where: { id: data.parentId } })
    if (!parent) throw new NotFoundError("Parent comment not found")
  }

  const comment = await db.comment.create({
    data: {
      content: data.content,
      videoId,
      userId,
      parentId: data.parentId ?? null,
    },
    include: commentInclude,
  })
  return mapComment(comment)
}

export const editCommentService = async (
  userId: string,
  commentId: string,
  data: editCommentBodySchemaType
) => {
  const comment = await db.comment.findUnique({ where: { id: commentId } })
  if (!comment) throw new NotFoundError("Comment not found")
  if (comment.userId !== userId) throw new ForbiddenError()

  const updated = await db.comment.update({
    where: { id: commentId },
    data: { content: data.content },
    include: commentInclude,
  })
  return mapComment(updated)
}

export const removeCommentService = async (userId: string, commentId: string) => {
  const comment = await db.comment.findUnique({ where: { id: commentId } })
  if (!comment) throw new NotFoundError("Comment not found")
  if (comment.userId !== userId) throw new ForbiddenError()

  await db.comment.delete({ where: { id: commentId } })
  return { id: comment.id }
}
