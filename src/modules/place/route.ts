import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { prisma } from "../../lib/prisma";

export const placesRoute = new Hono();

// GET /places
placesRoute.get("/places", async (c) => {
  const places = await prisma.place.findMany({
    relationLoadStrategy: "join",
    include: {
      city: true,
    },
    orderBy: [{ id: "asc" }, { createdAt: "asc" }],
  });

  return c.json(places);
});
