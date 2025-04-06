import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { QuerySearchCitySchema } from "../city/schema";
import { prisma } from "../../lib/prisma";

export const searchRoute = new Hono();

// ✅ GET /search?q=bunga
searchRoute.get("/", zValidator("query", QuerySearchCitySchema), async (c) => {
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

  return c.json(cities, 200);
});
