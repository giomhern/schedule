"use client";

import { motion } from "motion/react";

const Option = ({
  Icon,
  title,
  selected,
  setSelected,
  open,
  pathname,
  href,
}: any) => {
  return (
    <motion.div layout style={{ borderRadius: 10 }}>
      <a
        href={href}
        className={`relative flex h-10 w-full items-center rounded-md transition-colors ${
          pathname === href
            ? "bg-indigo-100 text-indigo-800"
            : "text-slate-500 hover:bg-slate-100"
        }`}
      >
        <motion.div
          layout
          className="grid h-full w-10 place-content-center text-lg"
        >
          <Icon />
        </motion.div>
        {open && (
          <motion.span
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
            className="text-sm font-medium"
          >
            {title}
          </motion.span>
        )}
      </a>
    </motion.div>
  );
};

export default Option;
