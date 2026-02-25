import Todo, { ITodo } from "../models/todoModel";

// Get all todos
export const getTodos = async (): Promise<ITodo[]> => {
  return await Todo.find().sort({ dueDate: 1 });
};

// Get todo by ID
export const getTodoById = async (id: string): Promise<ITodo | null> => {
  return await Todo.findById(id);
};

// Create todo
export const createTodo = async (name: string, dueDate: Date): Promise<ITodo> => {
  const todo = new Todo({ name, dueDate });
  return await todo.save();
};

// Update todo
export const updateTodo = async (
  id: string,
  updates: Partial<Pick<ITodo, "name" | "dueDate" | "completed">>
): Promise<ITodo | null> => {
  return await Todo.findByIdAndUpdate(id, updates, { new: true });
};

// Delete todo
export const deleteTodoById = async (id: string): Promise<ITodo | null> => {
  return await Todo.findByIdAndDelete(id);
};