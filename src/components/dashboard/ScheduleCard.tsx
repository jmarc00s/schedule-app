import React from 'react';
import { EStatusSchedule } from 'src/core/enum/status-schedule.enum';
import { ScheduleModel } from 'src/core/models/schedule.model';
import Card from '../Card';
import { IconCalendar } from '../icons/IconCalendar';
import { IconWarning } from '../icons/IconWarning';

interface ScheduleCardProps {
  schedules: ScheduleModel[];
}

const ScheduleCard = ({ schedules }: ScheduleCardProps) => {
  function isPendingSchedule(schedule: ScheduleModel) {
    return schedule.status === EStatusSchedule.PENDING;
  }

  return (
    <Card title="Próximos horários">
      {!!schedules.length && (
        <ul className="overflow-auto" style={{ height: '60vh' }}>
          {schedules.map((schedule) => (
            <li key={schedule.id} className="p-2 border-b border-gray-200">
              <div className="flex flex-row">
                <div className="flex flex-col w-1/3">
                  <p className="font-medium text-gray-800">{schedule.client?.name}</p>
                  <span className="text-sm text-gray-500">
                    {schedule.date} {schedule.time}
                  </span>
                </div>
                <div className="flex flex-row items-center justify-between flex-1">
                  <span className="px-2 py-1 text-xs font-semibold bg-blue-800 rounded-full text-gray-50">
                    {schedule.service?.description}
                  </span>

                  {isPendingSchedule(schedule) && (
                    <span className="flex items-center justify-center px-2 py-1 text-xs text-yellow-600 bg-yellow-100 rounded-full">
                      <span className="pr-2">{IconWarning}</span>
                      Não confirmado
                    </span>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      {!schedules.length && <p className="text-center">Nenhum horário a ser exibido!</p>}
    </Card>
  );
};

export default ScheduleCard;
