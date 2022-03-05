import { useEffect, useMemo, useState } from 'react';
import AddScheduleDialog from 'src/components/AddScheduleDialog';
import FabButton from 'src/components/FabButton';
import { IconPlusSm } from 'src/components/icons/IconPlusSm';
import PageHeader from 'src/components/PageHeader';
import ScheduleCard from 'src/components/dashboard/ScheduleCard';
import { useAxios } from '../core/hooks/useAxios';
import { ScheduleModel } from '../core/models/schedule.model';
import DashboardCard from 'src/components/dashboard/DashboardCard';
import Card from 'src/components/Card';
import { EStatusSchedule } from 'src/core/enum/status-schedule.enum';
import Calendar from 'src/components/calendar/Calendar';
import { parse } from 'date-fns';

const Home = () => {
  const [openModal, setOpenModal] = useState(false);
  const [schedules, setSchedules] = useState<ScheduleModel[]>([]);
  const { request } = useAxios<ScheduleModel[]>();

  async function getSchedules() {
    const response = await request({ url: `/schedules` });

    if (response) {
      setSchedules(response);
    }
  }

  useEffect(() => {
    getSchedules();
  }, []);

  const canceledSchedules = useMemo(
    () => schedules.filter((c) => c.status === EStatusSchedule.CANCELED).length,
    [schedules]
  );
  const confirmedSchedules = useMemo(
    () => schedules.filter((c) => c.status === EStatusSchedule.CONFIRMED).length,
    [schedules]
  );
  const pendingSchedules = useMemo(
    () => schedules.filter((c) => c.status === EStatusSchedule.PENDING).length,
    [schedules]
  );

  const nextSchedules = useMemo(() => {
    const currentDate = new Date();

    return schedules
      .filter(({ date }) => parse(date, 'dd/MM/yyyy', new Date()) >= currentDate)
      .sort((a, b) => {
        const aDate = parse(`${a.date} ${a.time}`, 'dd/MM/yyyy HH:mm', new Date());
        const bDate = parse(`${b.date} ${b.time}`, 'dd/MM/yyyy HH:mm', new Date());
        if (aDate > bDate) return 1;
        if (aDate < bDate) return -1;
        return 0;
      });
  }, [schedules]);

  return (
    <>
      <PageHeader title="Início" />
      <div className="flex lg:flex-row flex-col gap-3">
        <div className="w-2/3 flex flex-col gap-3">
          <div className="w-full">
            <Card title="Atendimentos">
              <div className="flex gap-10">
                <DashboardCard title="Realizados" value={0} variant="blue" />
                <DashboardCard
                  title="Confirmados"
                  value={confirmedSchedules}
                  variant="green"
                />
                <DashboardCard
                  title="Cancelados"
                  value={canceledSchedules}
                  variant="red"
                />
                <DashboardCard
                  title="Pendentes"
                  value={pendingSchedules}
                  variant="orange"
                />
              </div>
            </Card>
          </div>
          <Calendar schedules={schedules} />
        </div>
        <div className="flex-1">
          <ScheduleCard schedules={nextSchedules} />
        </div>
      </div>
      <FabButton icon={IconPlusSm} onClick={() => setOpenModal(true)} />
      <AddScheduleDialog open={openModal} setOpen={setOpenModal} onClose={getSchedules} />
    </>
  );
};

export default Home;
