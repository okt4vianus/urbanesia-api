import { Hono } from "hono";
import { cities } from "./data/cities";

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

app.get("/cities/:id", (c) => {
  const id = parseInt(c.req.param("id"));
  const city = cities.find((city) => city.id === id);
  return c.json(city);
});

export default app;
