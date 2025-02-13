import { memo } from "react";
import { motion } from "framer-motion";
import { Pencil, Trash2, Save, X } from "lucide-react";
import { Todo } from "../types/todo";
import { useEditTodo } from "../hooks/useEditTodo";

// Animation variants for the todo item container.
const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
};

// Common styling classes for input and textarea elements.
const inputClasses =
  "w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200";

interface TodoItemProps {
  todo: Todo;
  onDelete: (id: number) => Promise<void>;
  onUpdate: (id: number, updates: Partial<Todo>) => Promise<void>;
}

/**
 * TodoItem Component
 *
 * Renders a single todo item with the ability to edit or delete it.
 * Utilizes a custom hook `useEditTodo` to manage editing state.
 */
const TodoItem = ({ todo, onDelete, onUpdate }: TodoItemProps) => {
  // Destructure state and handler functions from the useEditTodo hook.
  const {
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
  } = useEditTodo(todo, onUpdate, onDelete);

  return (
    <motion.div
      key={todo.id}
      layout
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="bg-white p-6 rounded-xl shadow-lg transition-shadow hover:shadow-xl"
    >
      {isEditing ? (
        // Editing mode: show input fields and action buttons.
        <div className="space-y-4">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className={inputClasses}
          />
          <textarea
            value={editedBody}
            onChange={(e) => setEditedBody(e.target.value)}
            rows={3}
            className={inputClasses}
          />
          <div className="flex space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              disabled={isLoading}
              className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200 disabled:opacity-50"
            >
              <Save className="w-4 h-4 mr-2" />
              {isLoading ? "Saving..." : "Save"}
            </motion.button>
            {/* Cancel button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCancel}
              disabled={isLoading}
              className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 disabled:opacity-50"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </motion.button>
          </div>
        </div>
      ) : (
        // Default view mode: display todo details with edit and delete actions.
        <motion.div layout className="space-y-4">
          <div className="flex justify-between items-start">
            <motion.h3
              layout="position"
              className="text-xl font-semibold text-gray-900"
            >
              {todo.title}
            </motion.h3>
            <div className="flex space-x-2">
              {/* Edit button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsEditing(true)}
                disabled={isLoading}
                className="text-blue-600 hover:text-blue-800 transition-colors duration-200 disabled:opacity-50"
              >
                <Pencil className="w-5 h-5" />
              </motion.button>
              {/* Delete button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleDelete}
                disabled={isLoading}
                className="text-red-600 hover:text-red-800 transition-colors duration-200 disabled:opacity-50"
              >
                <Trash2 className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
          <motion.p layout="position" className="text-gray-600">
            {todo.body}
          </motion.p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default memo(TodoItem);
