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
            <td>{schedule.id}</td>
            <td>{schedule.client?.name}</td>
            <td>{schedule.service?.description}</td>
            <td>{schedule.date}</td>
            <td>{schedule.status}</td>
            <td></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SchedulesTable;
