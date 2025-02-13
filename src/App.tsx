import React, { Suspense, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { Header } from "./components/Header";
import { TodoList } from "./components/TodoList";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { useTodos } from "./hooks/useTodos";

// Lazy load the TodoForm component for better performance.
const TodoForm = React.lazy(() => import("./components/TodoForm"));

/**
 * App Component
 *
 * This is the root component of the application. It sets up the layout,
 * handles lazy loading for the TodoForm, and renders the Header, TodoForm, and TodoList.
 */
function App() {
  // Get the handleCreateTodo function from our custom hook.
  const { handleCreateTodo, fetchTodos } = useTodos();

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return (
    // Full-screen container with a gradient background.
    <div className=" min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Toaster for displaying notifications (positioned at top-right). */}
      <Toaster position="top-right" />

      {/* Main content container centered on the page. */}
      <div className="container max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Motion wrapper for smooth fade-in and slide-up animation. */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Application header */}
          <Header />

          {/* Suspense wrapper for lazy-loaded TodoForm with fallback spinner */}
          <Suspense fallback={<LoadingSpinner />}>
            <TodoForm onSubmit={handleCreateTodo} />
          </Suspense>

          {/* Render the TodoList component */}
          <TodoList />
        </motion.div>
      </div>
    </div>
  );
}

export default App;
