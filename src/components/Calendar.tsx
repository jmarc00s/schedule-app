import React, { ReactNode, useState } from 'react';
import Button from './Button';
import Card from './Card';
import {
  addDays,
  addWeeks,
  format,
  getDaysInMonth,
  getWeeksInMonth,
  isSameMonth,
  lastDayOfWeek,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import classNames from 'classnames';

interface WeekDay {
  name: string;
  shortName: string;
}

const weekDays: WeekDay[] = [
  {
    name: 'Domingo',
    shortName: 'Dom',
  },
  {
    name: 'Segunda',
    shortName: 'Seg',
  },
  {
    name: 'Terça',
    shortName: 'Ter',
  },
  {
    name: 'Quarta',
    shortName: 'Qua',
  },
  {
    name: 'Quinta',
    shortName: 'Qui',
  },
  {
    name: 'Sexta',
    shortName: 'Sex',
  },
  {
    name: 'Sábado',
    shortName: 'Sáb',
  },
];

const Calendar = () => {
  const currentDate = new Date();
  const monthYear = format(currentDate, 'MMMM yyyy', { locale: ptBR });
  const weeksInMonth = getWeeksInMonth(currentDate);
  const firstDayOfMonth = startOfMonth(currentDate);

  function renderWeeks() {
    let rows: ReactNode[] = [];
    const thClasses = `h-24 w-10 text-xs text-gray-400 border-r`;

    for (let week = 0; week < weeksInMonth; week++) {
      const dateInWeek = addWeeks(firstDayOfMonth, week);
      const dateStartOfWeek = startOfWeek(dateInWeek);
      const days: ReactNode[] = [];

      for (let day = 0; day < 7; day++) {
        const date = addDays(dateStartOfWeek, day);
        const isFirstOrLastWeek = week === 0 || week === weeksInMonth - 1;

        if (isFirstOrLastWeek && !isSameMonth(date, currentDate)) {
          days.push(<th className={classNames(thClasses, day === 0 && 'border-l')}></th>);
          continue;
        }

        days.push(
          <th
            className={classNames(
              thClasses,
              `hover:bg-gray-100 transition-all duration-75 cursor-pointer`,
              day === 0 && 'border-l'
            )}
          >
            {format(date, 'dd')}
          </th>
        );
      }

      rows = [...rows, <tr className="border-b">{days}</tr>];
    }

    return <>{rows}</>;
  }

  return (
    <Card title="Calendário">
      <section className="flex flex-col gap-8">
        <div className="flex justify-between">
          <span className="text-lg font-bold text-gray-600 capitalize">{monthYear}</span>
          <Button color="Dark indigo" label="Adicionar horário" />
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-t border-b">
              {weekDays.map((day) => (
                <th className="p-2 border-r border-l h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs text-gray-600">
                  <span className="xl:block lg:block md:block sm:block hidden">
                    {day.name}
                  </span>
                  <span className="xl:hidden lg:hidden md:hidden sm:hidden block">
                    {day.shortName}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{renderWeeks()}</tbody>
        </table>
      </section>
    </Card>
  );
};

export default Calendar;
