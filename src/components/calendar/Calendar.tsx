import { ReactNode, useMemo } from 'react';
import Card from '../Card';
import {
  addDays,
  addWeeks,
  format,
  getWeeksInMonth,
  isSameMonth,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import classNames from 'classnames';
import { ScheduleModel } from 'src/core/models/schedule.model';
import CalendarEvent from './CalendarEvent';
import CalendarRow from './CalendarRow';
import { weekDays } from './week-days.const';

interface CalendarProps {
  schedules: ScheduleModel[];
}

const Calendar = ({ schedules }: CalendarProps) => {
  const currentDate = new Date();
  const monthYear = format(currentDate, 'MMMM yyyy', { locale: ptBR });
  const weeksInMonth = getWeeksInMonth(currentDate);
  const firstDayOfMonth = startOfMonth(currentDate);

  const schedulesInMonth = useMemo(
    () =>
      schedules.filter(({ date }) => {
        const month = Number(date.substring(3, 5)) - 1;
        return currentDate.getMonth() === month;
      }),
    [schedules]
  );

  function createEventTitle(schedule: ScheduleModel) {
    let serviceDescription = schedule.service?.description;
    if (serviceDescription && serviceDescription?.length > 15) {
      serviceDescription = serviceDescription.substring(0, 15) + '...';
    }
    return `${schedule.time} - ${serviceDescription}`;
  }

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
              `hover:bg-gray-100 transition-all duration-75`,
              day === 0 && 'border-l'
            )}
          >
            <div className="flex flex-col justify-start h-full">
              <span className="text-right pr-1">{format(date, 'd')}</span>
              <div className="flex flex-col gap-0.5">
                {schedulesInMonth
                  .filter((schedule) => schedule.date === format(date, 'dd/MM/yyyy'))
                  .sort((a, b) => {
                    if (a.time > b.time) return 1;
                    if (a.time < b.time) return -1;
                    return 0;
                  })
                  .map((schedule) => (
                    <CalendarEvent title={createEventTitle(schedule)} />
                  ))}
              </div>
            </div>
          </th>
        );
      }

      rows = [...rows, <CalendarRow>{days}</CalendarRow>];
    }

    return <>{rows}</>;
  }

  return (
    <Card title="Calendário">
      <section className="flex flex-col gap-8">
        <div className="flex justify-between">
          <span className="text-lg font-bold text-gray-600 capitalize">{monthYear}</span>
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
