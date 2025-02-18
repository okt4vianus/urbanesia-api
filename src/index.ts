import { Hono } from "hono";

import { cities, type CreateCity, type City } from "./data/cities";
import { convertToSlug } from "./lib/slug";

const app = new Hono();

app.get("/", (c) => {
  return c.json({
    message: "Urbanesia API",
    description: "Welcome to Urbanesia API. Here are the available endpoints:",
    endpoints: [
      {
        path: "/cities",
        description: "Get a list of all cities",
      },
      {
        path: "cities/id/:id",
        description: "Get details of specific city by ID.",
      },
      {
        path: "/cities/slug/:slug",
        description: "Get details of specific city by slug",
      },
      {
        path: "/cities/search?=string",
        description: "Search cities by query",
      },
    ],
  });
});

app.get("/cities/search", async (c) => {
  console.log("Raw query:", c.req.query()); // Debug semua query parameters

  const query = c.req.query("q");

  if (!query) {
    return c.json(
      {
        error: "Search City not found",
      },
      404
    );
  }

  const results = cities.filter(
    (city) =>
      city.slug.toLowerCase().includes(query.toLowerCase()) ||
      city.name.toLocaleLowerCase().includes(query.toLowerCase()) ||
      city.description?.toLowerCase().includes(query.toLowerCase())
  );

  return c.json(results, 200);
});

app.get("/cities", (c) => {
  // next will retrieve data from database

  return c.json(cities);
});

app.get("/cities/id/:id", (c) => {
  const id = parseInt(c.req.param("id"));
  const city = cities.find((city) => city.id === id);
  if (!city) {
    return c.json(
      {
        error: "City not found",
      },
      404
    );
  }
  return c.json(city);
});

app.get("/cities/:slug", (c) => {
  const slug = c.req.param("slug");
  const city = cities.find((city) => city.slug === slug);
  if (!city) {
    return c.json(
      {
        error: "City not found",
      },
      404
    );
  }
  return c.json(city);
});

app.post("/cities", async (c) => {
  const body: CreateCity = await c.req.json();

  if (!body.name || !body.areaSize) {
    return c.json({ error: "Name and areaSize are required" }, 400);
  }

  const newId = cities.length > 0 ? cities[cities.length - 1].id + 1 : 1;
  const newSlug = convertToSlug(body.name);

  const newCity: City = {
    id: newId,
    slug: newSlug,
    ...body, //name, area-size, description
  };

  // const body = await c.req.json();
  // const newCity = {
  //   ...body,
  // };

  cities.push(newCity);
  console.log(newCity);
  return c.json(newCity, 201);

  // console.log("Create City");
  // return c.json(
  //   {
  //     message: "City Created",
  //   },
  //   201
  // );
});

export default app;
