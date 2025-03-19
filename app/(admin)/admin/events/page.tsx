"use client";

import Modal from "@/app/components/modal";
import useModal from "@/app/hooks/use-modal";
import { EventFormData } from "@/utils/types";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { FiChevronDown, FiClock, FiMapPin, FiPlus } from "react-icons/fi";
import { colors } from "@/utils/colors";

const formatDate = (dateString: string) => {
  const dateObj = new Date(dateString);
  return {
    monthName: dateObj.toLocaleDateString("en-US", { month: "short" }),
    dayNumber: dateObj.getDate(),
    weekdayName: dateObj.toLocaleDateString("en-US", { weekday: "long" }),
  };
};

const formatTime = (timeString: string) => {
  const [hours, minutes] = timeString.split(":");
  const dateObj = new Date();
  dateObj.setHours(parseInt(hours), parseInt(minutes));
  return dateObj.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

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
          <h1 className="text-2xl font-medium">Events</h1>
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
              const { monthName, dayNumber, weekdayName } = formatDate(
                event.date
              );
              const formattedTime = formatTime(event.time);
              const randomColor = colors[Math.floor(Math.random() * colors.length)];

              return (
                <div key={id} className="flex gap-2 w-full">
                  <div className="bg-slate-100 rounded-md pl-4 py-3 w-32 min-w-fit">
                    <h2 className="text-md font-medium">
                      {monthName} {dayNumber}
                    </h2>
                    <h4 className="text-sm text-slate-500 font-medium">
                      {weekdayName}
                    </h4>
                  </div>

                  <div className="flex gap-3 px-2 py-4 border border-slate-200 rounded-md flex-grow">
                  <div className={`w-1 h-full rounded-md ${randomColor}`}></div>
                    <div>
                      <h1 className="text-md font-medium mb-1">
                        {event.title}
                      </h1>
                      <div className="flex justify-center items-center gap-3">
                        {/* <div className="flex gap-1 items-center justify-center">
                          <div className="w-4 h-4 rounded-full border border-indigo-500 bg-indigo-500"></div>
                          <p className="text-xs text-slate-500">
                            Giovanni Maya
                          </p>
                        </div> */}
                        <div className="flex gap-1 items-center justify-center">
                          <FiClock className="w-4 h-4" />
                          <p className="text-sm text-slate-500">
                            {formattedTime}
                          </p>
                        </div>
                        <div className="flex gap-1 items-center justify-center">
                          <FiMapPin className="w-4 h-4" />
                          <p className="text-sm text-slate-500">
                            {event.location}
                          </p>
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
