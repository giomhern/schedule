"use client";
import { motion } from "motion/react";
import Sidebar from "@/app/components/sidebar";
import { FiPlus } from "react-icons/fi";

const Dashboard = () => {
  return (
    <motion.div layout className="bg-white flex">
      <Sidebar />
      <div className="p-10 flex-grow">
        <div className="mb-5 pb-5 w-full border-b border-slate-100">
          <h1 className="text-xl font-medium">Events</h1>
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 justify-center text-sm font-medium bg-indigo-500 border border-indigo-500 text-white px-3 py-1 rounded-md cursor-pointer hover:bg-indigo-400 hover:border-indigo-400">
            <FiPlus />
            <span>New Event</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
