import { Hono } from "hono";

import {
  cities as initialCities,
  type CreateCity,
  type City,
} from "./data/cities";
import { createSlug } from "./lib/slug";
import { createNewId } from "./lib/id";

let cities = initialCities;

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
        path: "/cities/search?=string",
        description: "Search cities by query",
      },
    ],
  });
});

// GET /cities
app.get("/cities", (c) => {
  // TODO: Retrieve data from database
  return c.json(cities);
});

// GET /cities/:slug
app.get("/cities/:slug", (c) => {
  const slug = c.req.param("slug");

  const city = cities.find((city) => city.slug === slug);

  if (!city) return c.json({ error: "City not found" }, 404);

  return c.json(city);
});

// POST /cities
app.post("/cities", async (c) => {
  const body: CreateCity = await c.req.json();

  if (!body.name || !body.areaSize) {
    return c.json({ message: "Name and areaSize are required" }, 400);
  }

  const newCity: City = {
    id: createNewId(cities),
    slug: createSlug(body.name),
    name: body.name,
    areaSize: body.areaSize,
    description: body.description || null,
  };

  cities.push(newCity);

  return c.json(newCity, 201);
});

// DELETE /cities
app.delete("/cities", (c) => {
  cities = [];
  return c.json({ message: `All cities has been deleted` });
});

// DELETE /cities/:id
app.delete("/cities/:id", (c) => {
  const id = parseInt(c.req.param("id"));

  const updatedCities = cities.filter((city) => city.id !== id);

  cities = updatedCities;

  return c.json({ message: `City by id ${id} has been deleted` });
});

// GET /search?q=bunga
app.get("/search", (c) => {
  const q = c.req.query("q");

  if (!q) return c.json({ error: "Query is required" }, 404);

  const results = cities.filter(
    (city) =>
      city.slug.toLowerCase().includes(q.toLowerCase()) ||
      city.name.toLocaleLowerCase().includes(q.toLowerCase()) ||
      city.description?.toLowerCase().includes(q.toLowerCase())
  );

  return c.json(results, 200);
});

// ---

app.get("/admin/cities/:id", (c) => {
  const id = parseInt(c.req.param("id"));

  const city = cities.find((city) => city.id === id);

  if (!city) return c.json({ message: `City by id ${id} not found` }, 404);

  return c.json(city);
});

export default app;
