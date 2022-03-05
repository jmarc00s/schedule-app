import React from 'react';

interface CalendarRowProps {
  children: any;
}

const CalendarRow = ({ children }: CalendarRowProps) => {
  return <tr className="border-b">{children}</tr>;
};

export default CalendarRow;
