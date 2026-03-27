import Elysia from "elysia";
import channelRoutes from "./channels/route";
import videoRoutes from "./videos/route";

const allModules = new Elysia({
  prefix: "/api"
})
  .use(channelRoutes)
  .use(videoRoutes)


export default allModules
