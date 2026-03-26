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

export const fail = (message: string, code?: string) => ({
  success: false as const,
  message,
  code,
});
