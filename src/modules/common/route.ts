import { Hono } from "hono";

export const commonRoute = new Hono();

// ✅ GET /
commonRoute.get("/", (c) => {
  return c.json({
    message: "Urbanesia API",
    description: "Welcome to Urbanesia API",
  });
});
