import Elysia from "elysia";
import { channelModule } from "./channel/channel.routes";

const allModules = new Elysia()
  .use(channelModule)


export default allModules
