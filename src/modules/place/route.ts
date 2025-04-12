import { Hono } from "hono";
import { prisma } from "../../lib/prisma";
import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { PlaceResponseSchema } from "./schema";
import { create } from "domain";

// export const placesRoute = new Hono();
export const placesRoute = new OpenAPIHono();

// GET /places
// placesRoute.get("/",
placesRoute.openapi(
  createRoute({
    tags: ["Places"],
    summary: "Get all places",
    method: "get",
    path: "/",
    responses: {
      200: {
        // content: { "application/json": { schema: PlaceResponseSchema } },
        description: "Get all places",
      },
    },
  }),
  async (c) => {
    const places = await prisma.place.findMany({
      relationLoadStrategy: "join",
      include: {
        city: true,
      },
      orderBy: [{ id: "asc" }, { createdAt: "asc" }],
    });

    return c.json(places);
  }
);
