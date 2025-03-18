"use client";

import Modal from "@/app/components/modal";
import useModal from "@/app/hooks/use-modal";
import { EventFormData } from "@/utils/types";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { FiChevronDown, FiClock, FiMapPin, FiPlus } from "react-icons/fi";

const Events = () => {
  const { modalOpen, close, open } = useModal();
  const [events, setEvents] = useState<EventFormData[]>([]);
  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch("/api/events");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        console.error("Error fetching events: ", err);
      }
    }
    fetchEvents();
  }, []);

  return (
    <div className="bg-white flex-grow">
      <div className="p-10">
        <header className="mb-5 pb-5 w-full border-b border-slate-200">
          <h1 className="text-xl font-medium">Events</h1>
        </header>
        <div className="flex gap-2 justify-between w-full pb-5">
          <motion.button
            onClick={open}
            whileHover={{ scale: 1.05 }}
            className="px-4 py-1 bg-indigo-500 text-white text-sm flex items-center font-medium
           justify-center rounded-sm gap-2 hover:cursor-pointer shadow-2xs"
          >
            <FiPlus />
            New Event
          </motion.button>
        </div>

        <AnimatePresence>
          {modalOpen && <Modal close={close} />}
        </AnimatePresence>

        <main className="space-y-3 w-full">
          {events &&
            events.map((event, id) => {
              return (
                <div key={id} className="flex gap-2 w-full">
                  <div className="bg-slate-100 rounded-md pl-4 py-3 w-32 min-w-fit">
                    <h2 className="text-sm font-medium">Dec 30</h2>
                    <h4 className="text-xs text-slate-500 font-medium">
                      Saturday
                    </h4>
                  </div>

                  <div className="flex gap-3 px-2 py-4 border border-slate-200 rounded-md flex-grow">
                    <div className="w-1 h-full bg-indigo-500 rounded-md"></div>
                    <div>
                      <h1 className="text-sm font-medium mb-1">
                        {event.title}
                      </h1>
                      <div className="flex justify-center items-center gap-3">
                        <div className="flex gap-1 items-center justify-center">
                          <div className="w-4 h-4 rounded-full border border-indigo-500 bg-indigo-500"></div>
                          <p className="text-xs slate-200">Giovanni Maya</p>
                        </div>
                        <div className="flex gap-1 items-center justify-center">
                          <FiClock className="w-3 h-3" />
                          <p className="text-xs slate-200">10:00 AM</p>
                        </div>
                        <div className="flex gap-1 items-center justify-center">
                          <FiMapPin className="w-3 h-3" />
                          <p className="text-xs slate-200">{event.location}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </main>
      </div>
    </div>
  );
};

export default Events;
