import { z } from "zod";

export const createTodoSchema = z.object({
  name: z.string().min(1, "Name is required"),
  dueDate: z.string().min(1, "Due date is required"),
});

export const updateTodoSchema = z.object({
  name: z.string().min(1).optional(),
  dueDate: z.string().optional(),
  completed: z.boolean().optional(),
});

// FIX: use string for MongoDB _id
export const idParamSchema = z.object({
  id: z.string().min(1, "ID is required"),
});