import { useState, useCallback } from "react";
import { Todo, CreateTodoInput, TodoActionType } from "../types";
import { todoApi } from "../api/todoApi";
import { toast } from "react-hot-toast";
import { useTodoContext } from "../contexts/TodoContext";
import { useSort } from "./useSort";
import { usePaginatedTodos } from "./usePaginatedTodos";

/**
 * Custom hook for managing CRUD operations on Todos.
 *
 * @returns An object with todos, loading state, and functions to fetch, create, update, and delete todos.
 */
export const useTodos = () => {
  const { state, dispatch } = useTodoContext();
  const { todos } = state;

  const [isLoading, setIsLoading] = useState(false);

  // Apply sorting on todos.
  const { sortOrder, toggleSortOrder, sortedTodos } = useSort(todos);
  // Apply pagination on the sorted todos.
  const { paginatedTodos, currentPage, totalPages, handlePageChange } =
    usePaginatedTodos(sortedTodos);

  /**
   * Fetches todos from the API.
   */
  const fetchTodos = useCallback(async () => {
    setIsLoading(true);
    dispatch({ type: TodoActionType.SET_LOADING, payload: true });

    try {
      const data = await todoApi.getTodos();
      dispatch({ type: TodoActionType.SET_TODOS, payload: data });
    } catch (error) {
      toast.error("Failed to fetch todos");
      throw error;
    } finally {
      setIsLoading(false);
      dispatch({ type: TodoActionType.SET_LOADING, payload: false });
    }
  }, [dispatch]);

  /**
   * Creates a new Todo.
   */
  const handleCreateTodo = useCallback(
    async (todo: CreateTodoInput) => {
      dispatch({ type: TodoActionType.SET_LOADING, payload: true });

      try {
        // Generate a unique ID for the new todo
        const tempId = Date.now(); // Unique numeric ID
        const newTodo = { id: tempId, ...todo };

        dispatch({ type: TodoActionType.ADD_TODO, payload: newTodo });
        toast.success("Todo created successfully");
      } catch (error) {
        toast.error("Failed to create todo");
        throw error;
      } finally {
        dispatch({ type: TodoActionType.SET_LOADING, payload: false });
      }
    },
    [dispatch]
  );

  /**
   * Updates an existing Todo.
   */
  const handleUpdateTodo = useCallback(
    async (id: number, updates: Partial<Todo>) => {
      dispatch({ type: TodoActionType.SET_LOADING, payload: true });

      try {
        const updatedTodo = await todoApi.updateTodo(id, updates);
        dispatch({ type: TodoActionType.UPDATE_TODO, payload: updatedTodo });
        toast.success("Todo updated successfully");
      } catch (error) {
        toast.error("Failed to update todo");
        throw error;
      } finally {
        dispatch({ type: TodoActionType.SET_LOADING, payload: false });
      }
    },
    [dispatch]
  );

  /**
   * Deletes a Todo.
   */
  const handleDeleteTodo = useCallback(
    async (id: number) => {
      dispatch({ type: TodoActionType.SET_LOADING, payload: true });

      try {
        await todoApi.deleteTodo(id);
        dispatch({ type: TodoActionType.DELETE_TODO, payload: id });
        toast.success("Todo deleted successfully");
      } catch (error) {
        toast.error("Failed to delete todo");
        throw error;
      } finally {
        dispatch({ type: TodoActionType.SET_LOADING, payload: false });
      }
    },
    [dispatch]
  );

  return {
    todos,
    isLoading,
    fetchTodos,
    handleCreateTodo,
    handleUpdateTodo,
    handleDeleteTodo,
    sortOrder,
    toggleSortOrder,
    paginatedTodos,
    currentPage,
    totalPages,
    handlePageChange,
  };
};
