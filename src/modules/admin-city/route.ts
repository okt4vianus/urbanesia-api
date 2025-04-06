import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { ParamCityIdSchema } from "../city/schema";
import { prisma } from "../../lib/prisma";

// ✅ GET /admin/cities/:id
export const adminCitiesRoute = new Hono();

adminCitiesRoute.get(
  "/:id",
  zValidator("param", ParamCityIdSchema),
  async (c) => {
    const { id } = c.req.valid("param");

    const city = await prisma.city.findUnique({ where: { id } });

    if (!city) return c.json({ message: `City by id ${id} not found` }, 404);

    return c.json(city);
  }
);
