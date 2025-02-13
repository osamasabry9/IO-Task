import { memo } from "react";
import { motion } from "framer-motion";
import { ListFilter } from "lucide-react";

const SortButton = memo(({ sortOrder, toggleSortOrder }: {
  sortOrder: "asc" | "desc";
  toggleSortOrder: () => void;
}) => (
  <motion.button
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.97 }}
    onClick={toggleSortOrder}
    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
  >
    <ListFilter className="w-4 h-4 mr-2" />
    Sort {sortOrder === "asc" ? "↑" : "↓"}
  </motion.button>
));


export default SortButton;
