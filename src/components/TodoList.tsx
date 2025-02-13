import React, { Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Pagination } from "./Pagination";
import { useTodos } from "../hooks/useTodos";
import { LoadingSpinner } from "./LoadingSpinner";
import SortButton from "./SortButton";

// Lazy load the TodoItem component to optimize performance.
const TodoItem = React.lazy(() => import("./TodoItem"));

// Memoize container variants to prevent recreation
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      staggerDirection: -1,
    },
  },
};

// Memoize empty state animation config
const emptyStateAnimation = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
  transition: { duration: 0.2 },
};

/**
 * TodoList Component
 *
 * This component displays the list of todos with sorting, pagination,
 * and provides feedback during loading states.
 */

export const TodoList = () => {
  const {
    isLoading,
    handleUpdateTodo,
    handleDeleteTodo,
    toggleSortOrder,
    sortOrder,
    paginatedTodos,
    currentPage,
    totalPages,
    handlePageChange,
  } = useTodos();

  // If the todos are still loading, display a loading spinner.
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
        <p className="text-gray-600 text-lg">Loading your todos...</p>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto space-y-6">
      {/* Header with title and sort toggle button */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-900">Your Todos</h2>
        <SortButton sortOrder={sortOrder} toggleSortOrder={toggleSortOrder} />
      </div>

      <AnimatePresence mode="wait">
        {paginatedTodos.length === 0 ? (
          <motion.div
            key="empty-state"
            {...emptyStateAnimation}
            className="text-center py-12 bg-white rounded-lg shadow-sm"
          >
            <p className="text-gray-600 text-lg">
              No todos yet. Create one above!
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="todo-list"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            <Suspense fallback={<LoadingSpinner />}>
              <AnimatePresence mode="popLayout">
                {paginatedTodos.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onDelete={handleDeleteTodo}
                    onUpdate={handleUpdateTodo}
                  />
                ))}
              </AnimatePresence>
            </Suspense>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
