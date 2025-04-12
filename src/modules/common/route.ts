import { OpenAPIHono, z } from "@hono/zod-openapi";
import { InfoResponseSchema } from "./schema";

export const commonRoute = new OpenAPIHono();

// ✅ GET /
commonRoute.openapi(
  {
    tags: ["Info"],
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
