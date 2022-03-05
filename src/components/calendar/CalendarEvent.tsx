import React from 'react';

interface CalendarEventProps {
  title: string;
  onClick?: () => void;
}

const CalendarEvent = ({ title, onClick }: CalendarEventProps) => {
  return (
    <span
      onClick={onClick}
      className="w-full rounded-full px-2 py-0.5 bg-indigo-600 text-white text-xs font-thin cursor-pointer text-left"
    >
      {title}
    </span>
  );
};

export default CalendarEvent;
