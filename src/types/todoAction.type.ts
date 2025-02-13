import { Todo } from "./todo.type";

// Using enum for action types for better type safety and autocompletion
enum TodoActionType {
  SET_TODOS = "SET_TODOS",
  ADD_TODO = "ADD_TODO",
  UPDATE_TODO = "UPDATE_TODO",
  DELETE_TODO = "DELETE_TODO",
  SET_LOADING = "SET_LOADING",
  SET_ERROR = "SET_ERROR",
  SET_PAGE = "SET_PAGE",
}

type TodoAction =
  | { type: TodoActionType.SET_TODOS; payload: Todo[] }
  | { type: TodoActionType.ADD_TODO; payload: Todo }
  | { type: TodoActionType.UPDATE_TODO; payload: Todo }
  | { type: TodoActionType.DELETE_TODO; payload: number }
  | { type: TodoActionType.SET_LOADING; payload: boolean }
  | { type: TodoActionType.SET_ERROR; payload: string | null }
  | { type: TodoActionType.SET_PAGE; payload: number };

export { type TodoAction , TodoActionType };
