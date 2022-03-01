import Datatable, { ColumnDefinition } from 'src/components/datatable/Datatable';
import DatatablePagination from 'src/components/datatable/DatatablePagination';
import { useToast } from 'src/core/hooks/useToast';
import Button from '../../../components/Button';
import { IconCancel } from '../../../components/icons/IconCancel';
import { IconCheck } from '../../../components/icons/IconCheck';
import { EStatusSchedule } from '../../../core/enum/status-schedule.enum';
import { useAxios } from '../../../core/hooks/useAxios';
import { ScheduleModel } from '../../../core/models/schedule.model';
import useSchedules from '../hooks/useSchedules';
import ScheduleTag from './ScheduleTag';

const SchedulesTable = () => {
  const { request, error } = useAxios<ScheduleModel>();
  const { showSuccessToast, showDefaultToast } = useToast();
  const { schedules, setSchedules, fetchSchedules } = useSchedules();

  const columns: ColumnDefinition[] = [
    {
      title: 'Cliente',
      type: 'text',
      renderText: ({ client }: ScheduleModel) => client?.name || '',
    },
    {
      title: 'Serviço',
      type: 'text',
      renderText: ({ service }: ScheduleModel) => service?.description || '',
    },
    {
      title: 'Horário',
      type: 'text',
      renderText: ({ date, time }: ScheduleModel) => `${date} - ${time}`,
    },
    {
      title: 'Status',
      type: 'element',
      element: (schedule: any) => <ScheduleTag status={schedule.status} />,
    },
    {
      title: 'Ações',
      type: 'action',
      actionElement: (id: number, schedule: ScheduleModel) => (
        <div className="flex justify-center gap-1">
          <Button
            disabled={schedule.status !== EStatusSchedule.PENDING}
            icon={IconCheck}
            color="Green"
            handleClick={() => {
              confirmSchedule(schedule);
            }}
          />

          <Button
            disabled={schedule.status !== EStatusSchedule.PENDING}
            icon={IconCancel}
            color="Red"
            handleClick={() => {
              cancelSchedule(schedule);
            }}
          />
        </div>
      ),
    },
  ];

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
    <>
      <Datatable columns={columns} datasource={schedules} />
      <DatatablePagination pages={10} onPagination={(page) => fetchSchedules(page)} />
    </>
  );
};

export default SchedulesTable;
