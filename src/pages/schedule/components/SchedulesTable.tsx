import React from 'react';
import Button from '../../../components/Button';
import { EStatusSchedule } from '../../../enum/status-schedule.enum';
import { useAxios } from '../../../hooks/useAxios';
import { ScheduleModel } from '../../../models/schedule.model';
import ScheduleTag from './ScheduleTag';

interface SchedulesTableProps {
  schedules: ScheduleModel[];
  setSchedules: (schedules: ScheduleModel[]) => void;
}

const SchedulesTable = ({ schedules, setSchedules }: SchedulesTableProps) => {
  const { request, error } = useAxios<ScheduleModel>();

  function confirmSchedule(schedule: ScheduleModel): void {
    editScheduleStatus(schedule, EStatusSchedule.CONFIRMED);
  }

  function cancelSchedule(schedule: ScheduleModel): void {
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

    const response = await request({
      url: `/schedules/${schedule?.id}`,
      method: 'PUT',
      data,
    });

    if (!error) {
      const newSchedules = [
        ...schedules.filter(({ id }) => id !== response?.id),
        response as ScheduleModel,
      ];

      setSchedules(newSchedules.sort((a, b) => a.id - b.id));
    }
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
                    confirmSchedule(schedule);
                  }}
                />
              </div>

              <Button
                disabled={schedule.status !== EStatusSchedule.PENDING}
                label="Cancelar"
                color="Red"
                handleClick={() => {
                  cancelSchedule(schedule);
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
