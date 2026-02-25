// src/models/todoModel.ts
import mongoose, { Schema, Document } from "mongoose";

export interface ITodo extends Document {
  name: string;
  dueDate: Date;
  completed: boolean;
}

const todoSchema = new Schema<ITodo>({
  name: { type: String, required: true },
  dueDate: { type: Date, required: true },
  completed: { type: Boolean, default: false },
});

const Todo = mongoose.model<ITodo>("Todo", todoSchema);

export default Todo;