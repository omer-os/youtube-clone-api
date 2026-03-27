import Elysia from "elysia";
import channelRoutes from "./channels/route";

const allModules = new Elysia({
  prefix: "/api"
})
  .use(channelRoutes)


export default allModules
