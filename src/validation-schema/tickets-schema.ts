import { z } from "zod";

export const createTicketSchema = z.object({
  title: z
    .string()
    .min(3)
    .regex(/^[a-z- ]+$/, {
      message: "must be lowercase letters or dashes",
    }),
  description: z.string().min(10, "at least 10 characters").max(65535),
  status: z.string().min(1, "status").optional(),
  priority: z.string().min(1, "priority").optional(),
});
