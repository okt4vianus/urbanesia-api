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

app.get("/cities", (context) => context.json(cities));

app.get("/cities/:id", (context) => {
  const id = parseInt(context.req.param("id")); // get id  from parameter url
  const city = cities.find((city) => city.id === id);
  return context.json(city);
});

export default app;
