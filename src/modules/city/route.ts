import { Prisma } from "@prisma/client";
import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { prisma } from "../../lib/prisma";
import {
  CitiesResponseSchema,
  CityResponseSchema,
  CreateCitySchema,
  ParamCityIdSchema,
  ParamCitySlugSchemaWith,
  UpdatePatchCitySchema,
  UpdatePutCitySchema,
} from "./schema";
import { createNewSlug } from "../../lib/slug";
import { ErrorResponseSchema, SuccessResponseSchema } from "../common/schema";

export const citiesRoute = new OpenAPIHono();

const tags = ["Cities"];

// ✅ GET /cities
citiesRoute.openapi(
  createRoute({
    tags,
    method: "get",
    path: "/",
    responses: {
      200: {
        content: { "application/json": { schema: CitiesResponseSchema } },
        description: "Get all cities",
      },
    },
  }),
  async (c) => {
    const cities = await prisma.city.findMany({
      orderBy: [{ id: "asc" }, { createdAt: "asc" }],
    });

    return c.json(cities);
  }
);

// ✅ GET /cities/:slug
citiesRoute.openapi(
  createRoute({
    tags,
    method: "get",
    path: "/{slug}",
    request: { params: ParamCitySlugSchemaWith },
    responses: {
      200: {
        content: { "application/json": { schema: CityResponseSchema } },
        description: "Get city by slug",
      },
      400: {
        description: "Bad request - duplicate value",
        // content: { "application/json": { schema: ErrorResponseSchema } },
      },
    },
  }),
  async (c) => {
    try {
      const { slug } = c.req.valid("param");
      const city = await prisma.city.findUnique({ where: { slug } });
      return c.json(city);
    } catch (error) {
      return c.json({ message: `City by slug not found` }, 400);
    }
  }
);

// ✅ POST /cities
citiesRoute.openapi(
  createRoute({
    tags,
    method: "post",
    path: "/",
    request: {
      body: { content: { "application/json": { schema: CreateCitySchema } } },
    },
    responses: {
      201: {
        content: { "application/json": { schema: CityResponseSchema } },
        description: "City created successfully",
      },
      500: {
        description: "Internal server error",
        content: { "application/json": { schema: ErrorResponseSchema } },
      },
    },
  }),
  async (c) => {
    try {
      const body = c.req.valid("json");

      const city = await prisma.city.create({
        data: { ...body, slug: body.slug ?? createNewSlug(body.name) },
      });

      return c.json(city, 201);
    } catch (error) {
      return c.json({ message: "Failed to create new city", error }, 500);
    }
  }
);

// ✅ DELETE /cities
citiesRoute.openapi(
  createRoute({
    tags,
    method: "delete",
    path: "/",
    responses: {
      200: {
        description: "All cities deleted successfully",
        content: { "application/json": { schema: SuccessResponseSchema } },
      },
      500: {
        description: "Internal server error",
        content: { "application/json": { schema: ErrorResponseSchema } },
      },
    },
  }),
  async (c) => {
    try {
      await prisma.city.deleteMany();
      return c.json({ message: "All cities have been deleted" }, 200);
    } catch (error) {
      return c.json({ error: "Failed to delete cities", details: error }, 500);
    }
  }
);

// ✅ DELETE /cities/:id
citiesRoute.openapi(
  createRoute({
    tags,
    method: "delete",
    path: "/:id",
    request: { params: ParamCityIdSchema },
    responses: {
      200: {
        description: "City deleted successfully",
        content: { "application/json": { schema: SuccessResponseSchema } },
      },
      500: {
        description: "Internal server error",
        content: { "application/json": { schema: ErrorResponseSchema } },
      },
    },
  }),
  async (c) => {
    try {
      const { id } = c.req.valid("param");
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
citiesRoute.openapi(
  createRoute({
    tags,
    method: "patch",
    path: "/:id",
    request: {
      params: ParamCityIdSchema,
      body: {
        content: { "application/json": { schema: UpdatePatchCitySchema } },
      },
    },
    responses: {
      200: {
        content: { "application/json": { schema: CityResponseSchema } },
        description: "City updated successfully",
      },
      500: {
        description: "Internal server error",
        content: { "application/json": { schema: ErrorResponseSchema } },
      },
    },
  }),
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

// ✅ PUT /cities/:id
citiesRoute.openapi(
  createRoute({
    tags,
    method: "put",
    path: "/:id",
    request: {
      params: ParamCityIdSchema,
      body: {
        content: { "application/json": { schema: UpdatePutCitySchema } },
      },
    },
    responses: {
      200: {
        content: { "application/json": { schema: CityResponseSchema } },
        description: "City updated or created successfully",
      },
      400: {
        description: "Bad request - duplicate value",
        content: { "application/json": { schema: ErrorResponseSchema } },
      },
      500: {
        description: "Internal server error",
        content: { "application/json": { schema: ErrorResponseSchema } },
      },
    },
  }),
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
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        return c.json(
          { message: `Put failed: Duplicate value on unique field(s):` },
          400
        );
      }
      return c.json({ message: "Put failed", error }, 500);
    }
  }
);
