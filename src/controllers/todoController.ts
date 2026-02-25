import type { Request, Response } from "express";
import {
  createTodo,
  deleteTodoById,
  getTodoById,
  getTodos,
  updateTodo,
} from "../service/todos";
import {
  createTodoSchema,
  updateTodoSchema,
  idParamSchema,
} from "../validators/todoValidators";
import type { ITodo } from "../models/todoModel";

// Get all todos
export const listTodos = async (_req: Request, res: Response) => {
  try {
    const todos = await getTodos();
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get single todo
export const getSingleTodo = async (req: Request, res: Response) => {
  const parsed = idParamSchema.safeParse(req.params);
  if (!parsed.success) return res.status(400).json(parsed.error.flatten());

  try {
    const todo = await getTodoById(parsed.data.id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Create todo
export const createSingleTodo = async (req: Request, res: Response) => {
  const parsed = createTodoSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.flatten());

  try {
    const { name, dueDate } = parsed.data;
    const newTodo = await createTodo(name, new Date(dueDate));
    res.status(201).json(newTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update todo
export const updateSingleTodo = async (req: Request, res: Response) => {
  const idParsed = idParamSchema.safeParse(req.params);
  if (!idParsed.success) return res.status(400).json(idParsed.error.flatten());

  const bodyParsed = updateTodoSchema.safeParse(req.body);
  if (!bodyParsed.success) return res.status(400).json(bodyParsed.error.flatten());

  // Convert dueDate string to Date if present
  const updates: Partial<Pick<ITodo, "name" | "dueDate" | "completed">> = {
    ...bodyParsed.data,
    dueDate: bodyParsed.data.dueDate ? new Date(bodyParsed.data.dueDate) : undefined,
  };

  try {
    const updated = await updateTodo(idParsed.data.id, updates);
    if (!updated) return res.status(404).json({ message: "Todo not found" });
    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete todo
export const deleteSingleTodo = async (req: Request, res: Response) => {
  const parsed = idParamSchema.safeParse(req.params);
  if (!parsed.success) return res.status(400).json(parsed.error.flatten());

  try {
    const deleted = await deleteTodoById(parsed.data.id);
    if (!deleted) return res.status(404).json({ message: "Todo not found" });
    res.json(deleted);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};