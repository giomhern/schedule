"use client";
import Sidebar from "@/app/components/sidebar";
import useModal from "@/app/hooks/use-modal";
import { AnimatePresence, motion } from "motion/react";
import { FiPlus, FiX } from "react-icons/fi";

const Dashboard = () => {
  const { modalOpen, close, open } = useModal();

  const modalVariants = {
    hidden: {
      scale: 0.8,
      opacity: 0,
      y: 20,
    },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
      },
    },
    exit: {
      scale: 0.8,
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.2,
      },
    },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <div className="bg-white flex">
      <Sidebar />
      <div className="p-10 flex-grow">
        <div className="mb-5 pb-5 w-full border-b border-slate-100">
          <h1 className="text-xl font-medium">Events</h1>
        </div>
        <div className="flex gap-3">
          <button
            onClick={open}
            className="px-4 py-1 bg-indigo-500 text-white text-sm flex items-center
           justify-center rounded-sm gap-2 hover:cursor-pointer"
          >
            <FiPlus />
            New Event
          </button>
        </div>

        <AnimatePresence>
          {modalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              {/* Backdrop */}
              <motion.div
                className="fixed inset-0 bg-black/10 backdrop-blur-sm"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={backdropVariants}
                onClick={close}
                transition={{ duration: 0.2 }}
              />

              {/* Modal */}
              <motion.div
                className="relative z-10 w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={modalVariants}
              >
                {/* Modal content */}
                <div className="space-y-3">
                  <h2 className="text-xl font-medium">New Event</h2>
                  <p className="text-muted-foreground text-sm">
                    Enter the details of your event here! 
                  </p>

                  {/* Placeholder for form - replace with your actual form */}
                  <div className="rounded-md border border-dashed border-gray-300 p-8 text-center dark:border-gray-600">
                    <p className="text-sm text-muted-foreground">
                      Your form goes here
                    </p>
                  </div>

                  <div className="flex justify-end gap-2">
                    <button onClick={close} className="px-4 py-2 text-red-700">Cancel</button>
                    <button onClick={close} className="bg-indigo-500 px-4 py-2 text-white rounded-md">Submit</button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Dashboard;
