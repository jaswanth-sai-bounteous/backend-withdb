import { Router } from "express"
import {
  listTodos,
  getSingleTodo,
  createSingleTodo,
  updateSingleTodo,
  deleteSingleTodo,
} from "../controllers/todoController"

const todoRouter = Router()

todoRouter.get("/", listTodos)
todoRouter.get("/:id", getSingleTodo)
todoRouter.post("/", createSingleTodo)
todoRouter.put("/:id", updateSingleTodo)
todoRouter.delete("/:id", deleteSingleTodo)

export default todoRouter