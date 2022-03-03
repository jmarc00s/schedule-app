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

const Home = () => {
  const [openModal, setOpenModal] = useState(false);
  const [schedules, setSchedules] = useState<ScheduleModel[]>([]);
  const { request } = useAxios<ScheduleModel[]>();

  useEffect(() => {
    async function getSchedules() {
      const response = await request({ url: '/schedules' });

      if (response) {
        setSchedules(response);
      }
    }

    getSchedules();
  }, []);

  const schedulesCanceled = useMemo(
    () => schedules.filter((c) => c.status === EStatusSchedule.CANCELED).length,
    [schedules]
  );
  const schedulesCompleted = useMemo(
    () => schedules.filter((c) => c.status === EStatusSchedule.CONFIRMED).length,
    [schedules]
  );
  const schedulesPending = useMemo(
    () => schedules.filter((c) => c.status === EStatusSchedule.PENDING).length,
    [schedules]
  );

  return (
    <>
      <PageHeader title="Dashboard" showProgress={false} handleBtnClick={() => {}} />
      <section className="flex lg:flex-row flex-col gap-3">
        <div className="w-2/3 flex flex-col">
          <div className="w-full">
            <Card title="Atendimentos">
              <div className="flex gap-10">
                <DashboardCard
                  title="Realizados"
                  value={schedulesCompleted}
                  variant="green"
                />
                <DashboardCard
                  title="Cancelados"
                  value={schedulesCanceled}
                  variant="red"
                />
                <DashboardCard
                  title="Pendentes"
                  value={schedulesPending}
                  variant="blue"
                />
              </div>
            </Card>
          </div>
        </div>
        <div className="flex-1">
          <ScheduleCard schedules={schedules} />
        </div>
      </section>
      <FabButton icon={IconPlusSm} onClick={() => setOpenModal(true)} />
      <AddScheduleDialog open={openModal} setOpen={setOpenModal} />
    </>
  );
};

export default Home;
