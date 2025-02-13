import { useMemo } from 'react';
import { Todo, TodoActionType } from '../types';
import { useTodoContext } from '../contexts/TodoContext';

/**
 * Custom hook to paginate a list of sorted Todos.
 *
 * @param sortedTodos - The sorted list of Todos.
 * @returns An object with the paginated todos, current page, total pages, and a page change handler.
 */
export const usePaginatedTodos = (sortedTodos: Todo[]) => {
  const { state, dispatch } = useTodoContext();
  const { currentPage, itemsPerPage } = state;

  // Calculate the todos for the current page.
  const paginatedTodos = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedTodos.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedTodos, currentPage, itemsPerPage]);

  // Compute the total number of pages.
  const totalPages = Math.ceil(sortedTodos.length / itemsPerPage);

  /**
   * Handles page changes.
   *
   * @param page - The new page number.
   */
  const handlePageChange = (page: number) => {
    dispatch({ type: TodoActionType.SET_PAGE, payload: page });
  };

  return { paginatedTodos, currentPage, totalPages, handlePageChange };
};
