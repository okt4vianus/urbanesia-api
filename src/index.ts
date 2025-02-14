import { Hono } from "hono";

import { cities, type CreateCity, type City } from "./data/cities";
import { convertToSlug } from "./lib/slug";

const app = new Hono();

app.get("/", (context) => {
  return context.json({
    message: "Urbanesia API",
    description: "Welcome to Urbanesia API. Here are the available endpoints:",
    endpoints: [
      {
        path: "/cities",
        description: "Get a list of all cities",
      },
      {
        path: "cities/:id",
        description: "Get details of specific city by ID.",
      },
    ],
  });
});

app.get("/cities", (c) => {
  return c.json(cities);
});

app.get("/cities/:slug", (c) => {
  const slug = c.req.param("slug");

  const city = cities.find((city) => city.slug === slug);

  if (!city) {
    return c.json({ message: "City not found" }, 404);
  }

  return c.json(city);
});

app.get("/search", (c) => {
  return c.json({ message: "Search cities by query" });
});

app.post("/cities", async (c) => {
  const body: CreateCity = await c.req.json();

  const newCityData: City = {
    id: 0, // TODO: Fix this
    slug: convertToSlug(body.name),
    ...body, // name, areaSize
  };

  cities.push(newCityData);

  return c.json(newCityData, 201);
});

export default app;
