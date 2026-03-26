import { Elysia } from "elysia";
import { channelModels, channelIdParams, channelSlugParams, channelListQuery } from "./channel.models";
import {
  listChannelsService,
  showChannelService,
  showChannelBySlugService,
  showMyChannelService,
  addChannelService,
  updateChannelService,
  removeChannelService,
} from "./channel.service";
import { authPlugin } from "../../plugins/auth.plugin";
import {
  listChannelsDocs,
  showChannelDocs,
  showChannelBySlugDocs,
  showMyChannelDocs,
  addChannelDocs,
  updateChannelDocs,
  removeChannelDocs,
} from "./channel.docs";

export const channelModule = new Elysia({
  prefix: "/channels",
  detail: { tags: ["Channels"] },
})
  .model(channelModels)
  .get("/", ({ query }) => listChannelsService(query.page, query.limit), {
    query: channelListQuery,
    ...listChannelsDocs,
  })
  .get("/:id", ({ params }) => showChannelService(params.id), {
    params: channelIdParams,
    ...showChannelDocs,
  })
  .get("/slug/:slug", ({ params }) => showChannelBySlugService(params.slug), {
    params: channelSlugParams,
    ...showChannelBySlugDocs,
  })
  .use(authPlugin)
  .get("/me", ({ user }) => showMyChannelService(user.id), {
    ...showMyChannelDocs,
  })
  .post("/", ({ body, user }) => addChannelService(body, user.id), {
    body: "channel.add",
    ...addChannelDocs,
  })
  .put("/:id", ({ params, body, user }) => updateChannelService(params.id, body, user.id), {
    params: channelIdParams,
    body: "channel.update",
    ...updateChannelDocs,
  })
  .delete("/:id", ({ params, user }) => removeChannelService(params.id, user.id), {
    params: channelIdParams,
    ...removeChannelDocs,
  });
