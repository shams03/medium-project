import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import {
  createBlogInput,
  updateBlogInput,
} from "@shamsii/medium-project-common/dist/zod";

const blogApp = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWTSECRET: string;
    SALT: number;
  };
  VARIABLES: {
    token: string;
    isValid: { id: string };
  };
}>();

blogApp.use("/*", async (c, next) => {
  const token = c.req.header("Authorization")?.split(" ")[1] || "";
  if (token.length > 0) {
    try {
      const isValid = await verify(token, c.env.JWTSECRET);
      if (isValid) {
        //@ts-ignore
        c.set("user_id", isValid.id);
        await next();
      }
    } catch {
      c.status(401);
      return c.text("Unauthorized");
    }
  }
});

blogApp.get("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  // get the given blog from its id
  try {
    const body = await c.req.json();

    const blog = await prisma.post.findFirst({
      where: {
        id: body.id,
      },
    });
    return c.json({
      blog: blog,
    });
  } catch (e) {
    c.status(400);
    return c.json({
      ErrorFound: e,
    });
  }
});

//pagination  //get all blogs
blogApp.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.post.findMany();

    return c.json({
      allBlogs: blog,
    });
  } catch (e) {
    c.status(400);
    return c.json({
      ErrorFound: e,
    });
  }
});

blogApp.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  // find blog by user_id in params
  try {
    const uid = c.req.param("id").toString();
    if (uid.length == 0) {
      c.status(400);
      return c.text("missing id in params");
    }
    const blog = await prisma.post.findMany({
      where: {
        authorId: uid,
      },
    });
    console.log(blog);
    return c.json({
      userid: uid,
      msg: blog,
    });
  } catch (e) {
    c.status(400);
    return c.json({
      ErrorFound: e,
    });
  }
});

blogApp.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  // console.log("fffddddd");
  const body = await c.req.json();
  
  const { success } = createBlogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({ message: "Invalid Inputs" });
  }
  if (!body.title || !body.content) {
    c.status(400);
    return c.text("missing parts in the body sent");
  }
  // @ts-ignore
  const userId: string = c.get("user_id");
  const blog = await prisma.post.create({
    data: { title: body.title, content: body.content, authorId: userId },
  });

  return c.json({
    msg: "post created",
    id: blog.id,
  });
});

blogApp.put("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
    
  const { success } = updateBlogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({ message: "Invalid Inputs" });
  }
    if (!body.title || !body.content) {
      c.status(400);
      return c.text("missing parts in the body sent");
    }
    const blog = await prisma.post.update({
      where: {
        id: body.id,
      },
      data: { title: body.title, content: body.content },
    });

    return c.json({
      msg: "post updated",
      id: blog.id,
      blog,
    });
  } catch {
    return c.text("probably wrong json format or db update issue");
  }
});

export default blogApp;
