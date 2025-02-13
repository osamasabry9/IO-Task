import { useState, useCallback } from 'react';
import { Todo } from '../types';

/**
 * Custom hook to manage editing operations for a Todo item.
 *
 * @param todo - The Todo item to edit.
 * @param onUpdate - Function to update the Todo.
 * @param onDelete - Function to delete the Todo.
 * @returns An object containing states and handlers for editing.
 */
export const useEditTodo = (
  todo: Todo,
  onUpdate: (id: number, updates: Partial<Todo>) => Promise<void>,
  onDelete: (id: number) => Promise<void>
) => {
  // Manage whether the Todo is in editing mode.
  const [isEditing, setIsEditing] = useState(false);
  // Manage the edited title and body.
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedBody, setEditedBody] = useState(todo.body);
  // Manage loading state for async operations.
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Saves the updated Todo.
   */
  const handleSave = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      await onUpdate(todo.id, { title: editedTitle, body: editedBody });
      setIsEditing(false);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, todo.id, editedTitle, editedBody, onUpdate]);

  /**
   * Deletes the Todo.
   */
  const handleDelete = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      await onDelete(todo.id);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, todo.id, onDelete]);

  /**
   * Cancels editing and resets changes.
   */
  const handleCancel = useCallback(() => {
    setEditedTitle(todo.title);
    setEditedBody(todo.body);
    setIsEditing(false);
  }, [todo.title, todo.body]);

  return {
    isEditing,
    editedTitle,
    editedBody,
    isLoading,
    setIsEditing,
    setEditedTitle,
    setEditedBody,
    handleSave,
    handleCancel,
    handleDelete,
  };
};
