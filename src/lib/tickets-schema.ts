import { z } from "zod";

export const createTicketSchema = z.object({
  title: z
    .string()
    .min(3)
    .regex(/^[^;"]+$/, {
      message: "Title contains invalid characters",
    }),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(65535),
  status: z.string().min(1, "status").optional(),
  priority: z.string().min(1, "priority").optional(),
});

export const editTicketSchema = z.object({
  title: z
    .string()
    .min(3)
    .regex(/^[^;]+$/, {
      message: "Title contains invalid characters ;",
    }),
  description: z
    .string()
    .min(10, "Descriptionat must be at least 10 characters")
    .max(65535),
  status: z.string().min(1, "status").optional(),
  priority: z.string().min(1, "priority").optional(),
  id: z.string(),
});
