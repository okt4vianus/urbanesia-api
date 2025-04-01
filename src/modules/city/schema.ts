import { z } from "zod";

// Schema Create City (name, areaSize required)
export const CreateCitySchema = z.object({
  name: z.string().min(3, "Name is required"),
  slug: z.string().min(3).optional(),
  areaSize: z.number().positive("Area size must be a positive number"),
  description: z.string().optional(),
});

// Schema Update City (all field optional)
export const UpdateCitySchema = z.object({
  name: z.string().min(3).optional(),
  slug: z.string().min(3).optional(),
  areaSize: z
    .number()
    .positive("Area size must be a positive number")
    .optional(),
  description: z.string().optional(),
});
