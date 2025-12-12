// validators/taskValidators.js
import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(1, "Title required"),
  description: z.string().optional().or(z.literal("")),
  priority: z.enum(["low", "medium", "high"]).optional(),
  status: z.enum(["pending", "inprogress", "completed"]).optional(),
  dueDate: z.string().optional().nullable() // frontend may send ISO string or empty
});

export const updateTaskSchema = createTaskSchema.partial(); // all fields optional for update
