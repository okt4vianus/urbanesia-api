import { z } from "zod";

// Schema for response
export const PlaceResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  description: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
