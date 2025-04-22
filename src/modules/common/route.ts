import { OpenAPIHono, z } from "@hono/zod-openapi";
import { InfoResponseSchema } from "./schema";
import { prisma } from "../../lib/prisma";

export const commonRoute = new OpenAPIHono();
const tags = ["Info"];

// ✅ GET /
commonRoute.openapi(
  {
    tags,
    method: "get",
    path: "/",
    summary: "Info API",
    responses: {
      200: {
        description: "Root info response",
        content: {
          "application/json": { schema: InfoResponseSchema },
        },
      },
    },
  },
  async (c) => {
    return c.json({
      message: "Urbanesia API",
      description: "Welcome to Urbanesia API",
      version: "1.0.0",
    });
  }
);

// ✅ GET /healthcheck
commonRoute.openapi(
  {
    tags,
    method: "get",
    path: "/healthcheck",
    summary: "Health Check API & DB",
    responses: {
      200: {
        description: "Response OK",
        content: {
          "application/json": {
            schema: z.object({
              message: z.string(),
              cityCount: z.number(),
            }),
          },
        },
      },
    },
  },
  async (c) => {
    const cityCount = await prisma.city.count();

    return c.json({
      message: "Succes connect to DB",
      cityCount,
    });
  }
);
