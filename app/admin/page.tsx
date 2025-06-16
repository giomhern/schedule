"use client";
import { EventFormData } from "@/utils/types";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import Modal from "@/app/components/modal";
import useModal from "@/app/hooks/use-modal";
import CalendarEvent from "@/app/components/calendar-event";
import FilterDropdown from "@/app/components/filter-dropdown";

const Events = () => {
  const { modalOpen, close, open } = useModal();
  const [events, setEvents] = useState<EventFormData[]>([]);
  const [filter, setFilter] = useState<"all" | "today" | "upcoming" | "past">(
    "upcoming"
  );

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

  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    switch (filter) {
      case "today":
        return eventDate.toDateString() === today.toDateString();
      case "upcoming":
        return eventDate > today;
      case "past":
        return eventDate < today;
      default:
        return true;
    }
  });

  return (
    <div className="bg-white flex-grow">
      <div className="p-10">
        <header className="mb-5 pb-5 w-full border-b border-slate-200">
          <h1 className="text-2xl font-medium">Events</h1>
        </header>
        <div className="flex gap-2 justify-start w-full pb-5">
          <motion.button
            onClick={open}
            whileHover={{ scale: 1.05 }}
            className="px-4 py-1 bg-indigo-500 text-white text-sm flex items-center font-medium
           justify-center rounded-sm gap-2 hover:cursor-pointer shadow-2xs"
          >
            <FiPlus />
            New Event
          </motion.button>
          <FilterDropdown filter={filter} onFilterChange={setFilter} />
        </div>

        <AnimatePresence>
          {modalOpen && <Modal close={close} />}
        </AnimatePresence>

        <main className="space-y-3 w-full">
          {filteredEvents &&
            filteredEvents.map((event, id) => {
              return <CalendarEvent key={id} event={event} />;
            })}
        </main>
      </div>
    </div>
  );
};

export default Events;
