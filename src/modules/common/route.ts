import { Hono } from "hono";

export const commonRoute = new Hono();

commonRoute.get("/about", (c) => {
  return c.json({
    message: "Urbanesia API",
    description: "Welcome to Urbanesia API",
    openapi: "/openapi.json",
  });
});
