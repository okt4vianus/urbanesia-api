import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { QuerySearchCitySchema } from "../city/schema";
import { prisma } from "../../lib/prisma";
import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { create } from "domain";
import * as path from "path";
import { ErrorResponseSchema } from "../common/schema";

// export const searchRoute = new Hono();
export const searchRoute = new OpenAPIHono();

// ✅ GET /search?q=bunga

// searchRoute.get("/", zValidator("query", QuerySearchCitySchema),
searchRoute.openapi(
  createRoute({
    tags: ["Search"],
    summary: "Search cities, places, and etc",
    method: "get",
    path: "/",
    request: {
      query: QuerySearchCitySchema,
    },
    responses: {
      200: {
        content: { "application/json": { schema: QuerySearchCitySchema } },
        description: "Search cities, places, and etc",
      },
      400: {
        // content: { "application/json": { schema: ErrorResponseSchema } },
        description: "Bad request",
      },
      404: {
        content: { "application/json": { schema: ErrorResponseSchema } },
        description: "Not found",
      },
    },
  }),
  async (c) => {
    const { q } = c.req.valid("query");

    const cities = await prisma.city.findMany({
      where: {
        OR: [
          { slug: { contains: q, mode: "insensitive" } },
          { name: { contains: q, mode: "insensitive" } },
          { description: { contains: q, mode: "insensitive" } },
        ],
      },
    });

    const places = await prisma.place.findMany({
      where: {
        OR: [
          { slug: { contains: q, mode: "insensitive" } },
          { name: { contains: q, mode: "insensitive" } },
          { description: { contains: q, mode: "insensitive" } },
        ],
      },
      include: { city: true },
    });

    return c.json({ cities, places }, 200);
  }
);
