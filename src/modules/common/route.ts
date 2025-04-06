import { Hono } from "hono";

export const commonRoute = new Hono();

// ✅ GET /
commonRoute.get("/", (c) => {
  return c.json({
    message: "Urbanesia API",
    description: "Welcome to Urbanesia API",
    // endpoints: [
    //   {
    //     method: "GET",
    //     path: "/cities",
    //     description: "Get a list of all cities",
    //   },
    //   {
    //     method: "GET",
    //     path: "/places",
    //     description: "Get a list of all places",
    //   },
    //   {
    //     method: "GET",
    //     path: "/cities/:slug",
    //     description: "Get details of specific city by slug",
    //   },
    //   {
    //     method: "GET",
    //     path: "/search?=string",
    //     description: "Search cities by query",
    //   },
    //   {
    //     method: "GET",
    //     path: "/admin/cities/:id",
    //     description: "Get details of specific city by id",
    //   },
    //   {
    //     method: "POST",
    //     path: "/cities",
    //     description: "Create a city",
    //   },
    //   {
    //     method: "DELETE",
    //     path: "/cities/:id",
    //     description: "Delete a city by id",
    //   },
    //   {
    //     method: "DELETE",
    //     path: "/cities",
    //     description: "Delete all cities",
    //   },
    //   {
    //     method: "PATCH",
    //     path: "/cities/:id",
    //     description: "Update a city by id",
    //   },
    //   {
    //     method: "PUT",
    //     path: "/cities:id",
    //     description: "Update a city by id, or create city",
    //   },
    // ],
  });
});
