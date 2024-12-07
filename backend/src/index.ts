import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";
import bcrypt from "bcryptjs";
import blogApp from "./routes/blog";
import userApp from "./routes/user";
import { cors } from "hono/cors";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWTSECRET: string;
    SALT: number;
  };
}>().basePath("/api/v1");

app.use("/*", cors());
app.route("/blog", blogApp);
app.route("/user", userApp);

export default app;
