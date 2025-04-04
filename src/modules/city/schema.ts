import { z } from "zod";

export const ParamSlugCitySchema = z.object({
  slug: z.string().min(1, "Slug is required"),
});

export const ParamIdCitySchema = z.object({
  id: z.string().min(1, "ID is required"),
});

export const QuerySearchCitySchema = z.object({
  q: z.string().min(1, "Query is required"),
});

export const CitySchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  areaSize: z.number(),
  description: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CitiesSchema = z.array(CitySchema);

// Schema Create City (name, areaSize required)
export const CreateCitySchema = z.object({
  name: z.string().min(3, "Name is required"),
  slug: z.string().min(3).optional(),
  areaSize: z.number().positive("Area size must be a positive number"),
  description: z.string().optional(),
});

export const UpdatePatchCitySchema = z.object({
  name: z.string().min(3).optional(),
  slug: z.string().min(3).optional(),
  areaSize: z
    .number()
    .positive("Area size must be a positive number")
    .optional(),
  description: z.string().optional(),
});

export const UpdatePutCitySchema = z.object({
  name: z.string().min(3),
  slug: z.string().min(3).optional(),
  areaSize: z.number().positive("Area size must be a positive number"),
  description: z.string().optional(),
});
