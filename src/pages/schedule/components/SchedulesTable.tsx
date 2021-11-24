import React from 'react';
import Button from '../../../components/Button';
import { EStatusSchedule } from '../../../enum/status-schedule.enum';
import { useAxios } from '../../../hooks/useAxios';
import { ScheduleModel } from '../../../models/schedule.model';
import ScheduleTag from './ScheduleTag';

interface SchedulesTableProps {
  schedules: ScheduleModel[];
}

const SchedulesTable = ({ schedules }: SchedulesTableProps) => {
  const { loading, request, error } = useAxios<ScheduleModel>();

  function confirmSchedule(scheduleId: number): void {
    const schedule = schedules.find(({ id }) => scheduleId === id);

    editScheduleStatus(schedule, EStatusSchedule.CONFIRMED);
  }

  function cancelSchedule(scheduleId: number): void {
    const schedule = schedules.find(({ id }) => scheduleId === id);

    editScheduleStatus(schedule, EStatusSchedule.CANCELED);
  }

  async function editScheduleStatus(
    schedule: ScheduleModel | undefined,
    status: EStatusSchedule
  ) {
    if (!schedule) {
      return;
    }

    const data = {
      ...schedule,
      status,
    } as ScheduleModel;

    await request({
      url: `/schedules/${schedule?.id}`,
      method: 'PUT',
      data,
    });
  }

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
            <td className="text-center">
              {schedule.date} - {schedule.time}
            </td>
            <td className="text-center">
              <ScheduleTag status={schedule.status} />
            </td>
            <td className="flex justify-center">
              <div className="mr-1">
                <Button
                  disabled={schedule.status !== EStatusSchedule.PENDING}
                  label="Confirmar"
                  color="Green"
                  handleClick={() => {
                    confirmSchedule(schedule.id);
                  }}
                />
              </div>

              <Button
                disabled={schedule.status !== EStatusSchedule.PENDING}
                label="Cancelar"
                color="Red"
                handleClick={() => {
                  cancelSchedule(schedule.id);
                }}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SchedulesTable;
