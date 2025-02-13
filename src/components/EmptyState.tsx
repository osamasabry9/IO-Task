import { motion } from 'framer-motion';

export const EmptyState = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="text-center py-12 bg-white rounded-lg shadow-sm"
  >
    <p className="text-gray-600 text-lg">No todos yet. Create one above!</p>
  </motion.div>
);
