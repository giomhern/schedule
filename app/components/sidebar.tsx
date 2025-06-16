"use client";
import { useState } from "react";
import {
  FiChevronDown,
  FiChevronsRight,
  FiCalendar,
  FiClipboard,
} from "react-icons/fi";
import { motion } from "motion/react";
import { usePathname, useRouter } from "next/navigation";
import Option from "./option";

const navLinks = [
  { href: "/admin", label: "Events", icon: FiCalendar },
  { href: "/admin/tasks", label: "Tasks", icon: FiClipboard },
];

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState("Events");
  const pathname = usePathname();

  return (
    <motion.nav
      layout
      className="sticky top-0 h-screen border-r border-slate-200 shrink-0 bg-white p-2"
      style={{
        width: open ? "225px" : "fit-content",
      }}
    >
      <Title open={open} />

      <div className="space-y-1">
        {navLinks.map((link, id) => (
          <Option
            key={id}
            Icon={link.icon}
            title={link.label}
            setSelected={setSelected}
            selected={selected}
            open={open}
            href={link.href}
            pathname={pathname}
          />
        ))}
      </div>

      <ToggleClose open={open} setOpen={setOpen} />
    </motion.nav>
  );
};

const Title = ({ open }: { open: any }) => {
  return (
    <div className="mb-3 border-b border-slate-200 py-3">
      <div className="flex cursor-pointer items-center justify-between">
        <div className="flex flex-col pl-3">
          <span className="block text-sm font-semibold">Giovanni Maya</span>
          <span className="block text-sm text-slate-500">Admin</span>
        </div>
      </div>
    </div>
  );
};

const ToggleClose = ({ open, setOpen }: any) => {
  return (
    <motion.button
      layout
      onClick={() => setOpen((pv: any) => !pv)}
      className="absolute bottom-0 left-0 right-0 border-t border-slate-200 transition-colors hover:bg-slate-200"
    >
      <div className="flex items-center p-2">
        <motion.div
          layout
          className="grid size-10 place-content-center text-lg"
        >
          <FiChevronsRight
            className={`transition-transform ${open && "rotate-180"}`}
          />
        </motion.div>
        {open && (
          <motion.span
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
            className="text-sm font-medium"
          >
            Hide
          </motion.span>
        )}
      </div>
    </motion.button>
  );
};

export default Sidebar;
