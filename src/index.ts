import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import { CreateCitySchema, UpdateCity, type CreateCity } from "./data/cities";
import { createNewSlug } from "./lib/slug";
import { prisma } from "./lib/prisma";
import { createNameNanoId, createSlugNanoId } from "./lib/nanoid";

const app = new Hono();

// ✅ GET /
app.get("/", (c) => {
  return c.json({
    message: "Urbanesia API",
    description: "Welcome to Urbanesia API. Here are the available endpoints:",
    endpoints: [
      {
        method: "GET",
        path: "/cities",
        description: "Get a list of all cities",
      },
      {
        method: "GET",
        path: "/places",
        description: "Get a list of all places",
      },
      {
        method: "GET",
        path: "/cities/:slug",
        description: "Get details of specific city by slug",
      },
      {
        method: "GET",
        path: "/search?=string",
        description: "Search cities by query",
      },
      {
        method: "GET",
        path: "/admin/cities/:id",
        description: "Get details of specific city by id",
      },
      {
        method: "POST",
        path: "/cities",
        description: "Create a city",
      },
      {
        method: "DELETE",
        path: "/cities/:id",
        description: "Delete a city by id",
      },
      {
        method: "DELETE",
        path: "/cities",
        description: "Delete all cities",
      },
      {
        method: "PATCH",
        path: "/cities/:id",
        description: "Update a city by id",
      },
      {
        method: "PUT",
        path: "/cities:id",
        description: "Update a city by id, or create city",
      },
    ],
  });
});

// ✅ GET /cities
app.get("/cities", async (c) => {
  const cities = await prisma.city.findMany({
    orderBy: [{ id: "asc" }, { createdAt: "asc" }],
  });

  return c.json(cities);
});

// ✅ GET /cities/:slug
app.get("/cities/:slug", async (c) => {
  const slug = c.req.param("slug");

  const city = await prisma.city.findUnique({ where: { slug } });

  if (!city)
    return c.json({ message: `City by slug '${slug}' not found` }, 404);

  return c.json(city);
});

// ✅ POST /cities
// TODO: Validate with Zod Validator Middleware
app.post("/cities", zValidator("json", CreateCitySchema), async (c) => {
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
app.delete("/cities", async (c) => {
  try {
    await prisma.city.deleteMany();
    return c.json({ message: "All cities have been deleted" }, 200);
  } catch (error) {
    return c.json({ error: "Failed to delete cities", details: error }, 500);
  }
});

// ✅ DELETE /cities/:id
app.delete("/cities/:id", async (c) => {
  const id = c.req.param("id");

  try {
    const deleteCity = await prisma.city.delete({ where: { id } });

    return c.json({
      message: `City with ID ${id} has been deleted`,
      data: deleteCity,
    });
  } catch (error) {
    return c.json({ error: "Failed to delete city", details: error }, 500);
  }
});

// ✅ PATCH /cities/:id
// TODO: Validate with Zod Validator Middleware
app.patch("/cities/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body: CreateCity = await c.req.json();
    const updatedCity = await prisma.city.update({
      where: { id },
      data: {
        ...body,
        slug: body.name ? createNewSlug(body.name) : undefined,
      },
    });

    return c.json(updatedCity, 200);
  } catch (error) {
    return c.json({ message: "Failed to update city", error }, 500);
  }
});

// ✅ PUT /cities/:id
// TODO: Validate with Zod Validator Middleware
app.put("/cities/:id", async (c) => {
  try {
    const id = c.req.param("id");

    const body: UpdateCity = await c.req.json();

    const slug = body.slug
      ? body.slug
      : body.name
      ? createNewSlug(body.name)
      : undefined;

    const result = await prisma.city.upsert({
      where: { id },
      update: {
        ...body,
        slug: slug,
      },
      create: {
        ...body,
        slug: slug ?? createSlugNanoId(),
        name: body.name ?? createNameNanoId(),
        areaSize: body.areaSize ?? 0,
      },
    });

    return c.json(result, 200);
  } catch (error) {
    return c.json({ message: "Put failed", error }, 500);
  }
});

// ✅ GET /search?q=bunga
app.get("/search", async (c) => {
  const q = c.req.query("q");

  if (!q) return c.json({ message: "Query is required" }, 404);

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

// ✅ GET /admin/cities/:id
app.get("/admin/cities/:id", async (c) => {
  const id = c.req.param("id");

  const city = await prisma.city.findUnique({ where: { id } });

  if (!city) return c.json({ message: `City by id ${id} not found` }, 404);

  return c.json(city);
});

// GET /places
app.get("/places", async (c) => {
  const places = await prisma.place.findMany({
    relationLoadStrategy: "join",
    include: {
      city: true,
    },
    orderBy: [{ id: "asc" }, { createdAt: "asc" }],
  });

  return c.json(places);
});

export default app;
