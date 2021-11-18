import React from 'react';
import { ScheduleModel } from '../../../models/schedule.model';

interface SchedulesTableProps {
  schedules: ScheduleModel[];
}

const SchedulesTable = ({ schedules }: SchedulesTableProps) => {
  return (
    <table className="w-full">
      <thead>
        <tr>
          <th>Id</th>
          <th>Cliente</th>
          <th>Serviço</th>
          <th>Horário</th>
          <th>Status</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {schedules.map((schedule) => (
          <tr key={schedule.id}>
            <td className="text-center">{schedule.id}</td>
            <td className="text-center">{schedule.client?.name}</td>
            <td className="text-center">{schedule.service?.description}</td>
            <td className="text-center">{schedule.date}</td>
            <td className="text-center">{schedule.status}</td>
            <td></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SchedulesTable;
