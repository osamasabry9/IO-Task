import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationButton = ({
  children,
  onClick,
  disabled,
  isActive = false,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  isActive?: boolean;
}) => (
  <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    onClick={onClick}
    disabled={disabled}
    className={`p-2 w-10 h-10 rounded-lg border
      ${disabled ? "opacity-50 cursor-not-allowed" : "hover:border-blue-500"}
      ${isActive ? "bg-blue-500 text-white border-blue-500" : "border-gray-300"}
    `}
  >
    {children}
  </motion.button>
);

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  // Calculate the visible pages based on the current page
  const visiblePages = useMemo(() => {
    const startPage = Math.max(1, currentPage - 3);
    const endPage = Math.min(totalPages, currentPage + 3);

    // Generate an array of pages within the range [startPage, endPage]
    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  }, [currentPage, totalPages]);

  return (
    <div className="flex justify-center items-center space-x-2 mt-6">
      {/* Previous Button */}
      <PaginationButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="w-5 h-5" />
      </PaginationButton>

      {/* Page Numbers */}
      <div className="flex space-x-2">
        {visiblePages.map((page) => (
          <PaginationButton
            key={page}
            onClick={() => onPageChange(page)}
            isActive={currentPage === page}
          >
            {page}
          </PaginationButton>
        ))}
      </div>

      {/* Next Button */}
      <PaginationButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="w-5 h-5" />
      </PaginationButton>
    </div>
  );
};
