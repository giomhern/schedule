import { colors } from "@/utils/colors";
import { FiClock, FiMapPin } from "react-icons/fi";

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
const CalendarEvent = ({ event }: { event: any }) => {
  const { monthName, dayNumber, weekdayName } = formatDate(event.date);
  const formattedTime = formatTime(event.time);
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  return (
    <div className="flex gap-2 w-full">
      <div className="bg-slate-100 rounded-md pl-4 py-3 w-32 min-w-fit">
        <h2 className="text-md font-medium">
          {monthName} {dayNumber}
        </h2>
        <h4 className="text-sm text-slate-500 font-medium">{weekdayName}</h4>
      </div>

      <div className="flex gap-3 px-2 py-4 border border-slate-200 rounded-md flex-grow">
        <div className={`w-1 h-full rounded-md ${randomColor}`}></div>
        <div>
          <h1 className="text-md font-medium mb-1">{event.title}</h1>
          <div className="flex justify-center items-center gap-3">
            <div className="flex gap-1 items-center justify-center">
              <div className="w-4 h-4 rounded-full border border-indigo-500 bg-indigo-500"></div>
              <p className="text-xs text-slate-500">Giovanni Maya</p>
            </div>
            <div className="flex gap-1 items-center justify-center">
              <FiClock className="w-4 h-4" />
              <p className="text-sm text-slate-500">{formattedTime}</p>
            </div>
            <div className="flex gap-1 items-center justify-center">
              <FiMapPin className="w-4 h-4" />
              <p className="text-sm text-slate-500">{event.location}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarEvent;
