import React from 'react';
import { ScheduleModel } from 'src/core/models/schedule.model';
import Card from '../Card';

interface ScheduleCardProps {
  schedules: ScheduleModel[];
}

const ScheduleCard = ({ schedules }: ScheduleCardProps) => {
  return (
    <Card title="Próximos horários">
      {schedules.length && (
        <ul>
          {schedules.map((schedule) => (
            <li key={schedule.id}>
              {schedule.client?.name} - {schedule.service?.description} - {schedule.date}{' '}
              - {schedule.time}
            </li>
          ))}
        </ul>
      )}
      {!schedules.length && <p className="text-center">Nenhum horário a ser exibido!</p>}
    </Card>
  );
};

export default ScheduleCard;
