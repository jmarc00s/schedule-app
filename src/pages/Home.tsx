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

    return schedules.filter(({ date }) => {
      const day = Number(date.substring(0, 2));
      const month = Number(date.substring(3, 5)) - 1;
      const year = Number(date.substring(6, 10));

      return new Date(year, month, day) >= currentDate;
    });
  }, [schedules]);

  return (
    <>
      <PageHeader title="Início" />
      <section className="flex lg:flex-row flex-col gap-3">
        <div className="w-2/3 flex flex-col gap-3">
          {/* <div className="w-full">
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
          </div> */}
          <Calendar schedules={schedules} />
        </div>
        <div className="flex-1">
          <ScheduleCard schedules={nextSchedules} />
        </div>
      </section>
      <FabButton icon={IconPlusSm} onClick={() => setOpenModal(true)} />
      <AddScheduleDialog open={openModal} setOpen={setOpenModal} onClose={getSchedules} />
    </>
  );
};

export default Home;
