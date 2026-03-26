import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { db } from "./db";
import { openAPI } from 'better-auth/plugins'


export const auth = betterAuth({
  emailAndPassword: {
    enabled: true
  },
  database: prismaAdapter(db, {
    provider: "sqlite",
  }),
  plugins: [openAPI()],
  basePath: "auth/"
});
