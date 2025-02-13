import { useState, useMemo, useCallback } from 'react';
import { Todo } from '../types';

/**
 * Custom hook to sort Todos by title.
 *
 * @param todos - The list of Todos to sort.
 * @returns An object with the current sort order, a toggle function, and the sorted todos.
 */
export const useSort = (todos: Todo[]) => {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  /**
   * Toggles the sort order between ascending and descending.
   */
  const toggleSortOrder = useCallback(() => {
    setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
  }, []);

  /**
   * Returns a sorted copy of the todos.
   */
  const sortedTodos = useMemo(() => {
    return [...todos].sort((a, b) => {
      const comparison = a.title.localeCompare(b.title);
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }, [todos, sortOrder]);

  return { sortOrder, toggleSortOrder, sortedTodos };
};
