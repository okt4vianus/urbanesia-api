import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { prisma } from "../../lib/prisma";
import {
  CreatePlaceSchema,
  ParamPlaceIdSchema,
  PlaceResponseSchema,
  PlacesResponseSchema,
  UpdatePatchPlaceSchema,
} from "./schema";
import { ErrorResponseSchema, SuccessResponseSchema } from "../common/schema";
import { createNewSlug } from "../../lib/slug";

// export const placesRoute = new Hono();
export const placesRoute = new OpenAPIHono();

const tags = ["Places"];

// GET /places
placesRoute.openapi(
  createRoute({
    tags,
    summary: "Get all places",
    method: "get",
    path: "/",
    responses: {
      200: {
        content: { "application/json": { schema: PlacesResponseSchema } },
        description: "Get all places",
      },
    },
  }),
  async (c) => {
    const places = await prisma.place.findMany({
      relationLoadStrategy: "join",
      orderBy: [{ id: "asc" }, { createdAt: "asc" }],
      include: {
        city: true,
      },
    });

    return c.json(places);
  }
);

// ✅ POST /places
placesRoute.openapi(
  createRoute({
    tags,
    summary: "Create a new place",
    method: "post",
    path: "/",
    request: {
      body: { content: { "application/json": { schema: CreatePlaceSchema } } },
    },
    responses: {
      201: {
        content: { "application/json": { schema: PlaceResponseSchema } },
        description: "Place created successfully",
      },
      500: {
        content: { "application/json": { schema: ErrorResponseSchema } },
        description: "Internal server error",
      },
    },
  }),
  async (c) => {
    try {
      const { citySlug, ...body } = c.req.valid("json");

      const place = await prisma.place.create({
        data: {
          ...body,
          slug: body.slug ?? createNewSlug(body.name),
          city: { connect: { slug: citySlug } },
        },
        include: {
          city: true,
        },
      });

      return c.json(place, 201);
    } catch (error) {
      return c.json({ message: "Failed to create new place", error }, 500);
    }
  }
);

// ✅ PATCH /places/:id
placesRoute.openapi(
  createRoute({
    tags,
    summary: "Update a place by ID",
    method: "patch",
    path: "/:id",
    request: {
      params: ParamPlaceIdSchema,
      body: {
        content: { "application/json": { schema: UpdatePatchPlaceSchema } },
      },
    },
    responses: {
      200: {
        content: { "application/json": { schema: PlaceResponseSchema } },
        description: "Place updated successfully",
      },
      404: {
        content: { "application/json": { schema: ErrorResponseSchema } },
        description: "Place not found",
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
      const updatedPlace = await prisma.place.update({
        where: { id },
        data: {
          ...body,
          slug: body.slug ?? createNewSlug(body.name ?? ""),
        },
      });

      return c.json(updatedPlace, 200);
    } catch (error) {
      return c.json({ message: "Failed to update place", error }, 500);
    }
  }
);

// ✅ DELETE /places/:id
placesRoute.openapi(
  createRoute({
    tags,
    summary: "Delete a place by ID",
    method: "delete",
    path: "/:id",
    request: { params: ParamPlaceIdSchema },
    responses: {
      200: {
        content: { "application/json": { schema: SuccessResponseSchema } },
        description: "Place deleted successfully",
      },
      404: {
        content: { "application/json": { schema: ErrorResponseSchema } },
        description: "Place not found",
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
      const deletePlace = await prisma.place.delete({ where: { id } });

      return c.json({
        message: `Place with ID ${id} has been deleted`,
        data: deletePlace,
      });
    } catch (error) {
      return c.json({ error: "Failed to delete place", details: error }, 500);
    }
  }
);

// ✅ DELETE /places
placesRoute.openapi(
  createRoute({
    tags,
    summary: "Delete all places",
    method: "delete",
    path: "/",
    responses: {
      200: {
        content: { "application/json": { schema: SuccessResponseSchema } },
        description: "Delete all places",
      },
      500: {
        content: { "application/json": { schema: ErrorResponseSchema } },
        description: "Internal server error",
      },
    },
  }),
  async (c) => {
    try {
      await prisma.place.deleteMany();
      return c.json({ message: "All places have been deleted" }, 200);
    } catch (error) {
      return c.json({ error: "Failed to delete places", details: error }, 500);
    }
  }
);
