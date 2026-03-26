import { Static, t, type TSchema } from "elysia";

export const apiResponse = <T extends TSchema>(dataSchema: T) =>
  t.Object({
    success: t.Boolean(),
    data: t.Optional(dataSchema),
    message: t.Optional(t.String()),
  });

export const apiError = t.Object({
  success: t.Literal(false),
  message: t.String()
});

export type ApiResponseType<T extends TSchema> = Static<ReturnType<typeof apiResponse<T>>>

export const ok = <T>(data: T, message?: string) => ({
  success: true as const,
  data,
  message,
});
export const paginatedResponse = <T extends TSchema>(dataSchema: T) =>
  t.Object({
    success: t.Boolean(),
    data: t.Optional(t.Array(dataSchema)),
    meta: t.Optional(t.Object({
      page: t.Number(),
      size: t.Number(),
      total: t.Number(),
      totalPages: t.Number(),
    })),
    message: t.Optional(t.String()),
  });

export const okPaginated = <T>(data: T[], meta: { page: number; size: number; total: number }) => ({
  success: true as const,
  data,
  meta: { ...meta, totalPages: Math.ceil(meta.total / meta.size) },
});
export const fail = (message: string, code?: string) => ({
  success: false as const,
  message,
  code,
});
