import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { prisma } from "../../lib/prisma";
import { createNewSlug } from "../../lib/slug";
import {
  CreateCitySchema,
  ParamIdCitySchema,
  ParamSlugCitySchema,
  UpdatePatchCitySchema,
  UpdatePutCitySchema,
} from "./schema";

export const citiesRoute = new Hono();

// ✅ GET /cities
citiesRoute.get("/", async (c) => {
  const cities = await prisma.city.findMany({
    orderBy: [{ id: "asc" }, { createdAt: "asc" }],
  });

  return c.json(cities);
});

// ✅ GET /cities/:slug
citiesRoute.get(
  "/:slug",
  zValidator("param", ParamSlugCitySchema),
  async (c) => {
    const slug = c.req.param("slug");

    const city = await prisma.city.findUnique({ where: { slug } });

    if (!city)
      return c.json({ message: `City by slug '${slug}' not found` }, 404);

    return c.json(city);
  }
);

// ✅ POST /cities
citiesRoute.post("/", zValidator("json", CreateCitySchema), async (c) => {
  try {
    const body = c.req.valid("json");

    const city = await prisma.city.create({
      data: {
        ...body,
        slug: body.slug ?? createNewSlug(body.name),
      },
    });

    return c.json(city, 201);
  } catch (error) {
    return c.json({ error: "Failed to create new city", details: error }, 500);
  }
});

// ✅ DELETE /cities
citiesRoute.delete("/", async (c) => {
  try {
    await prisma.city.deleteMany();
    return c.json({ message: "All cities have been deleted" }, 200);
  } catch (error) {
    return c.json({ error: "Failed to delete cities", details: error }, 500);
  }
});

// ✅ DELETE /cities/:id
citiesRoute.delete(
  "/:id",
  zValidator("param", ParamIdCitySchema),
  async (c) => {
    const { id } = c.req.valid("param");

    try {
      const deleteCity = await prisma.city.delete({ where: { id } });

      return c.json({
        message: `City with ID ${id} has been deleted`,
        data: deleteCity,
      });
    } catch (error) {
      return c.json({ error: "Failed to delete city", details: error }, 500);
    }
  }
);

// ✅ PATCH /cities/:id
citiesRoute.patch(
  "/:id",
  zValidator("param", ParamIdCitySchema),
  zValidator("json", UpdatePatchCitySchema),
  async (c) => {
    try {
      const { id } = c.req.valid("param");
      const body = c.req.valid("json");

      const updatedCity = await prisma.city.update({
        where: { id },
        data: {
          ...body,
          slug: body.slug ?? createNewSlug(body.name ?? ""),
        },
      });

      return c.json(updatedCity, 200);
    } catch (error) {
      return c.json({ message: "Failed to update city", error }, 500);
    }
  }
);

// ✅  PUT /cities/:id
citiesRoute.put(
  "/:id",
  zValidator("param", ParamIdCitySchema),
  zValidator("json", UpdatePutCitySchema),
  async (c) => {
    try {
      const { id } = c.req.valid("param");
      const body = c.req.valid("json");

      const result = await prisma.city.upsert({
        where: { id },
        update: {
          ...body,
          slug: body.slug ?? createNewSlug(body.name),
        },
        create: {
          name: body.name,
          slug: createNewSlug(body.name),
          areaSize: body.areaSize,
          description: body.description || null,
        },
      });

      return c.json(result, 200);
    } catch (error) {
      return c.json({ message: "Put failed", error }, 500);
    }
  }
);
