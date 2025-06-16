"use client"
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronDown } from "lucide-react"

type FilterOption = "all" | "today" | "upcoming" | "past"

interface FilterDropdownProps {
  filter: FilterOption
  onFilterChange: (filter: FilterOption) => void
}

const FilterDropdown = ({ filter, onFilterChange }: FilterDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleFilterSelect = (newFilter: FilterOption) => {
    onFilterChange(newFilter)
    setIsOpen(false)
  }

  // Format the filter text with first letter capitalized
  const formatFilterText = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1)
  }

  return (
    <div className="relative overflow-visible">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.02 }}
        className="px-4 py-1 bg-white border border-gray-200 text-sm flex items-center font-medium
        justify-between rounded-sm gap-2 hover:cursor-pointer shadow-sm min-w-[160px]"
      >
        <span>Show: {formatFilterText(filter)}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop to close dropdown when clicking outside */}
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full right-0 mt-1 w-full bg-white border border-gray-200 rounded-sm shadow-lg z-50"
            >
              {(["all", "today", "upcoming", "past"] as FilterOption[]).map((option) => (
                <button
                  key={option}
                  onClick={() => handleFilterSelect(option)}
                  className={`w-full px-4 py-2 flex justify-start text-sm font-medium hover:cursor-pointer hover:bg-gray-50 first:rounded-t-sm last:rounded-b-sm transition-colors duration-150 ${
                    filter === option ? "bg-gray-200" : ""
                  }`}
                >
                  Show: {formatFilterText(option)}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default FilterDropdown
