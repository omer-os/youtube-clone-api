import { t } from "elysia";

const channelItem = t.Object({
  id: t.String(),
  name: t.String(),
  slug: t.String(),
  description: t.Nullable(t.String()),
  avatarUrl: t.Nullable(t.String()),
  bannerUrl: t.Nullable(t.String()),
  userId: t.String(),
  createdAt: t.String(),
  updatedAt: t.String(),
});

export const channelModels = {
  "channel.add": t.Object({
    name: t.String({ minLength: 1, maxLength: 100 }),
    slug: t.String({ minLength: 1, maxLength: 100 }),
    description: t.Optional(t.String({ maxLength: 2000 })),
    avatarUrl: t.Optional(t.String({ format: "uri" })),
    bannerUrl: t.Optional(t.String({ format: "uri" })),
  }),
  "channel.update": t.Partial(
    t.Object({
      name: t.String({ minLength: 1, maxLength: 100 }),
      slug: t.String({ minLength: 1, maxLength: 100 }),
      description: t.String({ maxLength: 2000 }),
      avatarUrl: t.String({ format: "uri" }),
      bannerUrl: t.String({ format: "uri" }),
    })
  ),
  "channel.item": channelItem,
};

export const channelIdParams = t.Object({ id: t.String() });
export const channelSlugParams = t.Object({ slug: t.String() });
export const channelListQuery = t.Object({
  page: t.Optional(t.Numeric({ minimum: 1, default: 1 })),
  limit: t.Optional(t.Numeric({ minimum: 1, maximum: 100, default: 20 })),
});
