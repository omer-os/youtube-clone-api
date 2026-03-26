import { db } from "../../lib/db";

const channelInclude = {
  user: { select: { id: true, name: true, image: true } },
  _count: { select: { videos: true } },
};

export async function listChannelsService(page = 1, limit = 20) {
  return db.channel.findMany({
    skip: (page - 1) * limit,
    take: limit,
    orderBy: { createdAt: "desc" },
    include: channelInclude,
  });
}

export async function showChannelService(id: string) {
  return db.channel.findUnique({
    where: { id },
    include: channelInclude,
  });
}

export async function showChannelBySlugService(slug: string) {
  return db.channel.findUnique({
    where: { slug },
    include: channelInclude,
  });
}

export async function showChannelByUserIdService(userId: string) {
  return db.channel.findUnique({
    where: { userId },
  });
}

export async function addChannelService(
  data: { name: string; slug: string; description?: string; avatarUrl?: string; bannerUrl?: string },
  userId: string
) {
  return db.channel.create({
    data: { ...data, userId },
  });
}

export async function updateChannelService(
  id: string,
  data: Partial<{ name: string; slug: string; description: string; avatarUrl: string; bannerUrl: string }>,
  userId: string
) {
  return db.channel.update({
    where: { id, userId },
    data,
  });
}

export async function removeChannelService(id: string, userId: string) {
  return db.channel.delete({
    where: { id, userId },
  });
}
