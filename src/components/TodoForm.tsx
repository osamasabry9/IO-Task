import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle } from "lucide-react";
import { CreateTodoInput } from "../types";

interface TodoFormProps {
  onSubmit: (todo: CreateTodoInput) => Promise<void>;
}

const TodoForm = ({ onSubmit }: TodoFormProps) => {
  const [values, setValues] = useState({ title: "", body: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Define a common style for input and textarea fields
  const inputClass =
    "mt-1 block w-full px-4 py-2 rounded-lg border border-gray-300 " +
    "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 " +
    "transition-colors duration-200 sm:text-sm";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setValues((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { title, body } = values;
    if (!title.trim() || !body.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onSubmit({ title, body, userId: 1 });
      setValues({ title: "", body: "" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-xl shadow-lg"
    >
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          value={values.title}
          onChange={handleChange}
          placeholder="Enter title"
          className={inputClass}
        />
      </div>
      <div>
        <label
          htmlFor="body"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          id="body"
          value={values.body}
          onChange={handleChange}
          rows={3}
          placeholder="Enter description"
          className={inputClass}
        />
      </div>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={isSubmitting}
        className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <PlusCircle className="w-5 h-5 mr-2" />
        {isSubmitting ? "Adding..." : "Add Todo"}
      </motion.button>
    </motion.form>
  );
};

export default TodoForm;
