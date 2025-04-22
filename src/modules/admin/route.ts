import {
  CityResponseSchema,
  ParamCityIdSchema,
  ParamCitySlugSchemaWith,
} from "../city/schema";
import { prisma } from "../../lib/prisma";
import { createRoute, OpenAPIHono } from "@hono/zod-openapi";

export const adminCitiesRoute = new OpenAPIHono();

// ✅ GET /admin/cities/:id
adminCitiesRoute.openapi(
  createRoute({
    tags: ["Admin"],
    summary: "Get city by id",
    method: "get",
    path: "/id/:id",
    request: {
      params: ParamCityIdSchema,
    },
    responses: {
      200: {
        content: { "application/json": { schema: CityResponseSchema } },
        description: "Get city by id",
      },
      404: {
        // content: { "application/json": { schema: ErrorResponseSchema } },
        description: "City not found",
      },
    },
  }),
  async (c) => {
    const { id } = c.req.valid("param");

    const city = await prisma.city.findUnique({
      where: { id },
      include: { place: true },
    });

    if (!city) return c.json({ message: `City by id ${id} not found` }, 404);

    return c.json(city);
  }
);

// ✅ GET /cities/:slug
adminCitiesRoute.openapi(
  createRoute({
    tags: ["Admin"],
    summary: "Get city by slug",
    method: "get",
    path: "/slug/:slug",
    request: {
      params: ParamCitySlugSchemaWith,
    },
    responses: {
      200: {
        content: { "application/json": { schema: CityResponseSchema } },
        description: "Get city by slug",
      },
      404: {
        // content: { "application/json": { schema: ErrorResponseSchema } },
        description: "City not found",
      },
    },
  }),
  async (c) => {
    const { slug } = c.req.valid("param");
    const city = await prisma.city.findUnique({
      where: { slug },
      include: { place: true },
    });

    if (!city)
      return c.json({ message: `City by slug '${slug}' not found` }, 404);

    return c.json(city);
  }
);
