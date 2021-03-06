import { ReactNode, useMemo, useState } from 'react';
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
import CalendarEventDetailsDialog from './CalendarEventDetailsDialog';

interface CalendarProps {
  schedules: ScheduleModel[];
}

const Calendar = ({ schedules }: CalendarProps) => {
  const [selectedSchedule, setSelectedSchedule] = useState<ScheduleModel | undefined>();
  const [openDetailsDialog, setopenDetailsDialog] = useState(false);
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
          days.push(
            <th
              key={`${week}${day}`}
              className={classNames(thClasses, day === 0 && 'border-l')}
            ></th>
          );
          continue;
        }

        days.push(
          <th
            key={`${week}${day}`}
            className={classNames(
              thClasses,
              `hover:bg-gray-100 transition-all duration-75`,
              day === 0 && 'border-l'
            )}
          >
            <div className="flex flex-col justify-start h-full">
              <div className="flex justify-end pb-1 pr-1">
                <span
                  className={classNames(
                    format(date, 'dd/MM/yyyy') === format(currentDate, 'dd/MM/yyyy') &&
                      'bg-indigo-800 text-gray-100 flex items-center justify-center rounded-full w-5 h-5'
                  )}
                >
                  {format(date, 'd')}
                </span>
              </div>
              <div className="flex flex-col gap-0.5">
                {schedulesInMonth
                  .filter((schedule) => schedule.date === format(date, 'dd/MM/yyyy'))
                  .sort((a, b) => {
                    if (a.time > b.time) return 1;
                    if (a.time < b.time) return -1;
                    return 0;
                  })
                  .map((schedule, index) => (
                    <CalendarEvent
                      key={index}
                      onClick={() => handleEventClick(schedule)}
                      title={createEventTitle(schedule)}
                    />
                  ))}
              </div>
            </div>
          </th>
        );
      }

      rows = [...rows, <CalendarRow key={week}>{days}</CalendarRow>];
    }

    return <>{rows}</>;
  }

  function handleEventClick(schedule: ScheduleModel) {
    setSelectedSchedule(schedule);
    setopenDetailsDialog(true);
  }

  return (
    <Card title="Calend??rio">
      <section className="flex flex-col gap-8">
        <div className="flex justify-between">
          <span className="text-lg font-bold text-gray-600 capitalize">{monthYear}</span>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-t border-b">
              {weekDays.map((day, index) => (
                <th
                  key={index}
                  className="w-10 h-10 p-2 text-xs text-gray-600 border-l border-r xl:w-40 lg:w-30 md:w-30 sm:w-20 xl:text-sm"
                >
                  <span className="hidden xl:block lg:block md:block sm:block">
                    {day.name}
                  </span>
                  <span className="block xl:hidden lg:hidden md:hidden sm:hidden">
                    {day.shortName}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{renderWeeks()}</tbody>
        </table>
      </section>
      <CalendarEventDetailsDialog
        open={openDetailsDialog}
        setOpen={setopenDetailsDialog}
        schedule={selectedSchedule}
      />
    </Card>
  );
};

export default Calendar;
