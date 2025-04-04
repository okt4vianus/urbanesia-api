import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { prisma } from "../../lib/prisma";
import { ParamIdCitySchema } from "../city/schema";

export const adminCitiesRoute = new Hono();

// ✅ GET /admin/cities/:id
adminCitiesRoute.get(
  "/admin/cities/:id",
  zValidator("param", ParamIdCitySchema),
  async (c) => {
    const id = c.req.param("id");

    const city = await prisma.city.findUnique({ where: { id } });

    if (!city) return c.json({ message: `City by id ${id} not found` }, 404);

    return c.json(city);
  }
);
