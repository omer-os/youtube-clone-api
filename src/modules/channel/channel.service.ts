import { db } from "../../lib/db";
import { ok, fail } from "../../lib/response";

const channelInclude = {
  user: { select: { id: true, name: true, image: true } },
  _count: { select: { videos: true } },
};

export async function listChannelsService(page = 1, limit = 20) {
  const channels = await db.channel.findMany({
    skip: (page - 1) * limit,
    take: limit,
    orderBy: { createdAt: "desc" },
    include: channelInclude,
  });
  return ok(channels);
}

export async function showChannelService(id: string) {
  const channel = await db.channel.findUnique({
    where: { id },
    include: channelInclude,
  });
  if (!channel) return fail("Channel not found");
  return ok(channel);
}

export async function showChannelBySlugService(slug: string) {
  const channel = await db.channel.findUnique({
    where: { slug },
    include: channelInclude,
  });
  if (!channel) return fail("Channel not found");
  return ok(channel);
}

export async function showMyChannelService(userId: string) {
  const channel = await db.channel.findUnique({
    where: { userId },
  });
  if (!channel) return fail("You don't have a channel");
  return ok(channel);
}

export async function addChannelService(
  data: { name: string; slug: string; description?: string; avatarUrl?: string; bannerUrl?: string },
  userId: string
) {
  const existing = await db.channel.findUnique({ where: { userId } });
  if (existing) return fail("You already have a channel");
  const slugTaken = await db.channel.findUnique({ where: { slug: data.slug } });
  if (slugTaken) return fail("Slug is already taken");
  const channel = await db.channel.create({ data: { ...data, userId } });
  return ok(channel, "Channel added");
}

export async function updateChannelService(
  id: string,
  data: Partial<{ name: string; slug: string; description: string; avatarUrl: string; bannerUrl: string }>,
  userId: string
) {
  const channel = await db.channel.findUnique({ where: { id } });
  if (!channel) return fail("Channel not found");
  if (channel.userId !== userId) return fail("Not your channel");
  if (data.slug) {
    const slugTaken = await db.channel.findFirst({ where: { slug: data.slug, id: { not: id } } });
    if (slugTaken) return fail("Slug is already taken");
  }
  const updated = await db.channel.update({ where: { id }, data });
  return ok(updated, "Channel updated");
}

export async function removeChannelService(id: string, userId: string) {
  const channel = await db.channel.findUnique({ where: { id } });
  if (!channel) return fail("Channel not found");
  if (channel.userId !== userId) return fail("Not your channel");
  await db.channel.delete({ where: { id } });
  return ok(null, "Channel removed");
}
