import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { createNewSlug } from "../../lib/slug";
import { ErrorResponseSchema, SuccessResponseSchema } from "../common/schema";
import {
  CitiesResponseSchema,
  CityResponseSchema,
  CreateCitySchema,
  ParamCityIdentifierSchema,
  ParamCityIdSchema,
  UpdatePatchCitySchema,
  UpdatePutCitySchema,
} from "./schema";

export const citiesRoute = new OpenAPIHono();

const tags = ["Cities"];

// ✅ GET /cities
citiesRoute.openapi(
  createRoute({
    tags,
    summary: "Get all cities",
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

// ✅ GET /cities/:identifier
citiesRoute.openapi(
  createRoute({
    tags,
    summary: "Get city by identifier (ID or slug)",
    method: "get",
    path: "/:identifier",
    request: {
      params: ParamCityIdentifierSchema,
    },
    responses: {
      200: {
        content: { "application/json": { schema: CityResponseSchema } },
        description: "Get city by identifier",
      },
      404: {
        // content: { "application/json": { schema: ErrorResponseSchema } },
        description: "City not found",
      },
      500: {
        content: { "application/json": { schema: ErrorResponseSchema } },
        description: "Internal server error",
      },
    },
  }),
  async (c) => {
    const { identifier } = c.req.valid("param");

    const city = await prisma.city.findFirst({
      where: {
        OR: [{ id: identifier }, { slug: identifier }],
      },
      include: { place: true },
    });

    if (!city) {
      return c.json(
        {
          error: "NotFound",
          message: `City with identifier '${identifier}' not found`,
        },
        404
      );
    }

    return c.json(city);
  }
);

// ✅ POST /cities
citiesRoute.openapi(
  createRoute({
    tags,
    summary: "Create a new city",
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
        content: { "application/json": { schema: ErrorResponseSchema } },
        description: "Internal server error",
      },
    },
  }),
  async (c) => {
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
      return c.json(
        { error: "Failed to create new city", details: error },
        500
      );
    }
  }
);

// ✅ DELETE /cities
citiesRoute.openapi(
  createRoute({
    tags,
    summary: "Delete all cities",
    method: "delete",
    path: "/",
    responses: {
      200: {
        content: { "application/json": { schema: SuccessResponseSchema } },
        description: "Delete all cities",
      },
      500: {
        content: { "application/json": { schema: ErrorResponseSchema } },
        description: "Internal server error",
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
    summary: "Delete a city by ID",
    method: "delete",
    path: "/:id",
    request: { params: ParamCityIdSchema },
    responses: {
      200: {
        content: { "application/json": { schema: SuccessResponseSchema } },
        description: "City deleted successfully",
      },
      404: {
        content: { "application/json": { schema: ErrorResponseSchema } },
        description: "City not found",
      },
      500: {
        content: { "application/json": { schema: ErrorResponseSchema } },
        description: "Internal server error",
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
    summary: "Update a city by ID",
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
      404: {
        content: { "application/json": { schema: ErrorResponseSchema } },
        description: "City not found",
      },
      500: {
        content: { "application/json": { schema: ErrorResponseSchema } },
        description: "Internal server error",
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

// // ✅  PUT /cities/:id
citiesRoute.openapi(
  createRoute({
    tags,
    summary: "Update or create a city by ID",
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
        description: "City updated successfully",
      },
      201: {
        content: { "application/json": { schema: CityResponseSchema } },
        description: "City created successfully",
      },
      400: {
        content: { "application/json": { schema: ErrorResponseSchema } },
        description: "Bad request - duplicate value",
      },
      500: {
        content: { "application/json": { schema: ErrorResponseSchema } },
        description: "Internal server error",
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
          {
            message: `Put failed: Duplicate value on unique field(s):`,
          },
          400
        );
      }
      return c.json({ message: "Put failed", error }, 500);
    }
  }
);
