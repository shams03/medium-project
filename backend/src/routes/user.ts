import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";
import bcrypt from "bcryptjs";
import {
  signupInput,
  signinInput,
} from "@shamsii/medium-project-common/dist/zod";

const userApp = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWTSECRET: string;
    SALT: number;
  };
}>();

userApp.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const { success } = signinInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({ message: "Invalid Inputs" });
  }
  const token = c.req.header("Authorization")?.split(" ")[1] || "";

  if (token.length > 0) {
    try {
      const payload = await verify(token, c.env.JWTSECRET);
      //  console.log("payload ",payload)
      return c.json({
        userId: payload.id,
        token: token,
        msg: "token verified",
      });
    } catch {
      console.log(" token not verified ");
    }
  }
  if (body.password < 8) {
    c.status(400);
    return c.text("password length must be more than 8");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });
  if (!user) {
    c.status(400);
    return c.text("No user found");
  } else {
    const isPassValid = await bcrypt.compare(body.password, user.password);
    if (!isPassValid) {
      c.status(400);
      return c.json({ message: "Invalid Password" });
    }

    const payload = {
      id: user.id,
      exp: Math.floor(Date.now() / 1000) + 60 * 5 * 60 * 2, // Token expires in 600 minutes
    };
    const token = await sign(payload, c.env.JWTSECRET);
    //token in cookie remaining
    return c.json({
      token: token,
      message: "logged in successfully",
    });
  }
});

userApp.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const { success } = signupInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({ message: "Invalid Inputs" });
  }

  const exist = await prisma.user.findMany({
    where: {
      email: body.email,
    },
  });
  if (exist.length > 0) {
    c.status(400);
    return c.json({
      message: "email already registered",
    });
  }
  if (body.password.length < 8) {
    c.status(400);
    return c.json({
      message: "password length should atleast be 8",
    });
  }

  const hashedPass = await bcrypt.hash(body.password, c.env.SALT);

  // if (hashedPass) {
  //   return c.text("ERROR while hashing the password.");
  // }

  const user = await prisma.user.create({
    //@ts-ignore
    data: {
      email: body.email,
      password: hashedPass,
      name: body?.name,
    },
  });

  return c.json({
    message: "account created successfully",
  });
});

export default userApp;
