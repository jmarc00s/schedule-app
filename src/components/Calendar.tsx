import React, { useState } from 'react';
import Button from './Button';
import Card from './Card';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

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
  const currentMonth = format(currentDate, 'MMMM', { locale: ptBR });
  const currentYear = currentDate.getFullYear();

  return (
    <Card title="Calendário">
      <section className="flex flex-col gap-8">
        <div className="flex justify-between">
          <span className="text-lg font-bold text-gray-600 capitalize">
            {currentMonth} {currentYear}
          </span>
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
          <tbody></tbody>
        </table>
      </section>
    </Card>
  );
};

export default Calendar;
