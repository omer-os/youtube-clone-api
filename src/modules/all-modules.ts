import Elysia from "elysia";
import channelRoutes from "./channels/route";
import videoRoutes from "./videos/route";
import commentRoutes from "./comments/route";

const allModules = new Elysia({
  prefix: "/api"
})
  .use(channelRoutes)
  .use(videoRoutes)
  .use(commentRoutes)



export default allModules
