import React from 'react';
import { ScheduleModel } from 'src/core/models/schedule.model';
import Card from '../Card';

interface ScheduleCardProps {
  schedules: ScheduleModel[];
}

const ScheduleCard = ({ schedules }: ScheduleCardProps) => {
  return (
    <Card title="Próximos horários">
      {!!schedules.length && (
        <ul className="overflow-auto" style={{ height: '60vh' }}>
          {schedules.map((schedule) => (
            <li key={schedule.id} className="p-2 border-b border-gray-200">
              <div className="flex flex-row">
                <div className="flex flex-col w-2/3">
                  <p className="text-gray-800 font-medium">{schedule.client?.name}</p>
                  <span className="text-gray-500 text-sm">
                    {schedule.date} {schedule.time}
                  </span>
                </div>
                <div className="flex-1 flex items-center">
                  <div className="px-2 py-1 rounded-full bg-blue-800 text-gray-50 font-semibold text-xs">
                    {schedule.service?.description}
                  </div>
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
