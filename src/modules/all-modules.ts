import Elysia from "elysia";
import channelRoutes from "./channels/route";

const allModules = new Elysia()
  .use(channelRoutes)


export default allModules
