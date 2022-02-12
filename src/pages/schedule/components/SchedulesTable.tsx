import React from 'react';
import { useToast } from 'src/core/hooks/useToast';
import Button from '../../../components/Button';
import { IconCancel } from '../../../components/icons/IconCancel';
import { IconCheck } from '../../../components/icons/IconCheck';
import { EStatusSchedule } from '../../../core/enum/status-schedule.enum';
import { useAxios } from '../../../core/hooks/useAxios';
import { ScheduleModel } from '../../../core/models/schedule.model';
import ScheduleTag from './ScheduleTag';

interface SchedulesTableProps {
  schedules: ScheduleModel[];
  setSchedules: (schedules: ScheduleModel[]) => void;
}

const SchedulesTable = ({ schedules, setSchedules }: SchedulesTableProps) => {
  const { request, error } = useAxios<ScheduleModel>();
  const { showSuccessToast, showDefaultToast } = useToast();

  function confirmSchedule(schedule: ScheduleModel): void {
    editScheduleStatus(schedule, EStatusSchedule.CONFIRMED);
    showSuccessToast('Horário confirmado com sucesso!');
  }

  function cancelSchedule(schedule: ScheduleModel): void {
    editScheduleStatus(schedule, EStatusSchedule.CANCELED);
    showDefaultToast('Horário cancelado com sucesso!');
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
    <div className="shadow border-b border-gray-200 rounded-lg">
      <table className="min-w-full table-auto">
        <thead className="bg-indigo-600 text-gray-50 mb-5">
          <tr>
            <th className="text-left px-5 py-3 uppercase text-sm font-medium tracking-wider rounded-tl-lg">
              Cliente
            </th>
            <th className="text-left px-5 py-3 uppercase text-sm font-medium tracking-wider">
              Serviço
            </th>
            <th className="text-left px-5 py-3 uppercase text-sm font-medium tracking-wider">
              Horário
            </th>
            <th className="text-left px-5 py-3 uppercase text-sm font-medium tracking-wider">
              Status
            </th>
            <th className="text-center px-5 py-3 uppercase text-sm font-medium tracking-wider rounded-tr-lg">
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {schedules.map((schedule, index) => (
            <tr
              key={schedule.id}
              className={`${index % 2 === 1 ? 'bg-indigo-100' : ''} font-light text-lg`}
            >
              <td className="p-5">{schedule.client?.name}</td>
              <td>{schedule.service?.description}</td>
              <td>
                {schedule.date} - {schedule.time}
              </td>
              <td>
                <ScheduleTag status={schedule.status} />
              </td>
              <td className="flex justify-center py-3">
                <div className="mr-1">
                  <Button
                    disabled={schedule.status !== EStatusSchedule.PENDING}
                    icon={IconCheck}
                    color="Green"
                    handleClick={() => {
                      confirmSchedule(schedule);
                    }}
                  />
                </div>

                <Button
                  disabled={schedule.status !== EStatusSchedule.PENDING}
                  icon={IconCancel}
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
    </div>
  );
};

export default SchedulesTable;
