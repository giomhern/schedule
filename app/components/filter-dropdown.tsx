"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FiChevronDown } from "react-icons/fi";
type FilterOption = "all" | "today" | "upcoming" | "past";

interface FilterDropdownProps {
  filter: FilterOption;
  onFilterChange: (filter: FilterOption) => void;
}

const FilterDropdown = ({ filter, onFilterChange }: FilterDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleFilterSelect = (newFilter: FilterOption) => {
    onFilterChange(newFilter);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.02 }}
        className="px-4 py-1 bg-white border border-gray-200 text-sm flex items-center font-medium
        justify-between rounded-sm gap-2 hover:cursor-pointer shadow-2xs min-w-[140px]"
      >
        <span>Show: {filter.charAt(0).toUpperCase() + filter.slice(1)}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <FiChevronDown />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-sm shadow-lg z-10"
          >
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-sm shadow-lg z-10"
                >
                  {["all", "today", "upcoming", "past"].map((option) => (
                    <motion.button
                      key={option}
                      onClick={() => handleFilterSelect(option as FilterOption)}
                      whileHover={{ backgroundColor: "#F9FAFB" }}
                      className="w-full px-4 py-2 flex justify-start text-sm font-medium hover:cursor-pointer hover:bg-gray-400"
                    >
                      Show: {option.charAt(0).toUpperCase() + option.slice(1)}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FilterDropdown;
