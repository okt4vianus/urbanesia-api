import { z } from "zod";

export const InfoResponseSchema = z.object({
  message: z.string(),
  description: z.string(),
  version: z.string(),
});

export const SuccessResponseSchema = z.object({
  message: z.string(),
  data: z.any().optional(),
});

export const ErrorResponseSchema = z.object({
  message: z.string(),
  error: z.any().optional(),
});
