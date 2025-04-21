import { z } from "zod";
import { CityResponseSchema } from "../city/schema";

const LatitudeSchema = z
  .number()
  .min(-90)
  .max(90, "Latitude must be between -90 and 90");
const LongitudeSchema = z
  .number()
  .min(-180)
  .max(180, "Longitude must be between -180 and 180");

// Schema for creating a new place
export const CreatePlaceSchema = z.object({
  name: z.string().min(3, "Name is required"),
  slug: z.string().min(3).optional(),
  latitude: LatitudeSchema,
  longitude: LongitudeSchema,
  description: z.string().optional(),
  citySlug: z.string().optional(),
});

// Schema Update Patch Place (all field optional)
export const UpdatePatchPlaceSchema = z.object({
  name: z.string().min(3).optional(),
  slug: z.string().min(3).optional(),
  latitude: LatitudeSchema.optional(),
  longitude: LongitudeSchema.optional(),
  description: z.string().optional(),
  citySlug: z.string().optional(),
});

// Schema for parameter
export const ParamPlaceIdSchema = z.object({
  id: z.string().min(3, "Place ID is required"),
});

export const ParamPlaceIdentifierSchema = z.object({
  identifier: z.string().min(3, "Identifier is required"), // Place ID or slug
});

export const PlaceResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  description: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
  city: CityResponseSchema.optional().nullable(),
});

export const PlacesResponseSchema = z.array(PlaceResponseSchema);
