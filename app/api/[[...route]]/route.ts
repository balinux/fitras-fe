import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { Hono } from "hono";
import { handle } from "hono/vercel";
import accounts  from "./accounts";

export const runtime = "edge";

const app = new Hono().basePath("/api");


//  define route
const routes = app.route("/accounts", accounts);

app.get("/", clerkMiddleware(), (c) => {
  const auth = getAuth(c);
  if (!auth?.userId) {
    return c.json(
      {
        message: "Unauthorized",
      },
      401,
    );
  }

  return c.json({
    message: "Hello Hono!",
    user: auth.userId,
  });
});

export const GET = handle(app);
export const POST = handle(app);
export type AppType = typeof routes;
