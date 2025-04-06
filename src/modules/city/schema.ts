import { z } from "zod";

// Schema Create City (name, areaSize required)
export const CreateCitySchema = z.object({
  name: z.string().min(3, "Name is required"),
  slug: z.string().min(3).optional(),
  areaSize: z.number().positive("Area size must be a positive number"),
  description: z.string().optional(),
});

// Schema Update Patch City (all field optional)
export const UpdatePatchCitySchema = z.object({
  name: z.string().min(3).optional(),
  slug: z.string().min(3).optional(),
  areaSize: z
    .number()
    .positive("Area size must be a positive number")
    .optional(),
  description: z.string().optional(),
});

// Schema Update Put City (all field optional)
export const UpdatePutCitySchema = z.object({
  name: z.string().min(3),
  slug: z.string().min(3).optional(),
  areaSize: z.number().positive("Area size must be a positive number"),
  description: z.string().optional(),
});

export const ParamCityIdSchema = z.object({
  id: z.string().min(3, "City ID is required"),
});

export const ParamCitySlugSchemaWith = z.object({
  slug: z.string().min(3, "City slug is required"),
});

export const QuerySearchCitySchema = z.object({
  q: z.string().min(3, "Search query is required"),
});

// Schema for response
export const CityResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  areaSize: z.number(),
  description: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CitiesResponseSchema = z.array(CityResponseSchema);

export const ErrorResponseSchema = z.object({
  message: z.string(),
});
