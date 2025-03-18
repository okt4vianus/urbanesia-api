import { Hono } from "hono";

import {
  cities as initialCities,
  type CreateCity,
  type City,
  type UpdateCity,
} from "./data/cities";
import { createNewSlug } from "./lib/slug";
import { createNewId } from "./lib/id";
import { prisma } from "./lib/prisma";

let citiesJSON = initialCities;

const app = new Hono();

// GET /
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

// GET /cities
app.get("/cities", async (c) => {
  const cities = await prisma.city.findMany(); // Retrieve data from database

  return c.json(citiesJSON);
});

// GET /cities/:slug
app.get("/cities/:slug", async (c) => {
  const slug = c.req.param("slug");

<<<<<<< HEAD
  // const city = citiesJSON.find((city) => city.slug === slug);
  const city = await prisma.city.findUnique({ where: { slug } });

  if (!city)
    return c.json({ message: `City by slug '${slug}' not found` }, 404);
=======
  const city = citiesJSON.find((city) => city.slug === slug);
  if (!city) return c.json({ message: `City by slug ${slug} not found` }, 400);
>>>>>>> 3adb02a9aefb904641b78259fada8b82dd349327

  return c.json(city);
});

// POST /cities
app.post("/cities", async (c) => {
  const body: CreateCity = await c.req.json();

  if (!body.name || !body.areaSize) {
    return c.json({ message: "Name and areaSize are required" }, 400);
  }

  const newCity: City = {
    id: createNewId(citiesJSON),
    slug: createNewSlug(body.name),
    name: body.name,
    areaSize: body.areaSize,
    //...body, //name, area-size, description,
    description: body.description || null,
  };

  citiesJSON.push(newCity);

  return c.json(newCity, 201);
});

// DELETE /cities
app.delete("/cities", (c) => {
  citiesJSON = [];

  return c.json({ message: "All cities has been deleted" });
});

// DELETE /cities/:id
app.delete("/cities/:id", (c) => {
  const id = parseInt(c.req.param("id"));

  const city = citiesJSON.find((city) => city.id === id);
  if (!city) return c.json({ message: `City by id ${id} not found` }, 404);

  const updateCities = citiesJSON.filter((city) => city.id !== id);

  citiesJSON = updateCities;

  return c.json({
    message: `City by id ${id} has been deleted`,
    value: city,
  });
});

// PATCH /cities/:id
app.patch("/cities/:id", async (c) => {
  const id = parseInt(c.req.param("id"));

  const city = citiesJSON.find((city) => city.id === id);
  if (!city) return c.json({ message: `City by id '${id}' not found` }, 404);

  const body: UpdateCity = await c.req.json();

  const updatedCities = citiesJSON.map((city) => {
    if (city.id === id) {
      return {
        ...city,
        ...body,
        slug: body.slug || createNewSlug(body.name),
      };
    } else {
      return city;
    }
  });

  citiesJSON = updatedCities;

  return c.json({ message: `City by id ${id} has been updated` }, 200);
});

// PUT /cities/:id
app.put("/cities/:id", async (c) => {
  const id = parseInt(c.req.param("id"));

  const body: UpdateCity = await c.req.json();

  const city = citiesJSON.find((city) => city.id === id);

  if (!city) {
    const newCity: City = {
      id: createNewId(citiesJSON),
      slug: createNewSlug(body.name),
      name: body.name,
      areaSize: body.areaSize,
      description: body.description || null,
    };

    citiesJSON.push(newCity);

    return c.json(newCity, 201);
  }

  const updatedCities = citiesJSON.map((city) => {
    if (city.id === id) {
      return {
        ...city,
        ...body,
        slug: body.slug || createNewSlug(body.name),
      };
    } else {
      return city;
    }
  });

  citiesJSON = updatedCities;

  return c.json({ message: `City by id ${id} has been updated` }, 200);
});

// GET /search?q=bunga
app.get("/search", async (c) => {
  const q = c.req.query("q");

  if (!q) return c.json({ message: "Query is required" }, 404);

<<<<<<< HEAD
  // const results = citiesJSON.filter(
  //   (city) =>
  //     city.slug.toLowerCase().includes(q.toLowerCase()) ||
  //     city.name.toLocaleLowerCase().includes(q.toLowerCase()) ||
  //     city.description?.toLowerCase().includes(q.toLowerCase())
  // );

  const results = await prisma.city.findMany({
    where: {
      OR: [
        { slug: { contains: q, mode: "insensitive" } },
        { name: { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
      ],
    },
  });
=======
  const results = citiesJSON.filter(
    (city) =>
      city.slug.toLowerCase().includes(q.toLowerCase()) ||
      city.name.toLocaleLowerCase().includes(q.toLowerCase()) ||
      city.description?.toLowerCase().includes(q.toLowerCase())
  );
>>>>>>> 3adb02a9aefb904641b78259fada8b82dd349327

  return c.json(results, 200);
});

// GET /admin/cities/:id
app.get("/admin/cities/:id", async (c) => {
  // const id = parseInt(c.req.param("id"));
  const id = c.req.param("id");

<<<<<<< HEAD
  // const city = citiesJSON.find((city) => city.id === id);
  const city = await prisma.city.findUnique({ where: { id } });
=======
  const city = citiesJSON.find((city) => city.id === id);
>>>>>>> 3adb02a9aefb904641b78259fada8b82dd349327

  if (!city) return c.json({ message: `City by id ${id} not found` }, 404);

  return c.json(city);
});

export default app;
