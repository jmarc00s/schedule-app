import { useEffect, useState } from 'react';
import AddScheduleDialog from 'src/components/AddScheduleDialog';
import FabButton from 'src/components/FabButton';
import { IconPlusSm } from 'src/components/icons/IconPlusSm';
import PageHeader from 'src/components/PageHeader';
import ScheduleCard from 'src/components/ScheduleCard';
import { useAxios } from '../core/hooks/useAxios';
import { ScheduleModel } from '../core/models/schedule.model';

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

  return (
    <>
      <PageHeader title="Dashboard" showProgress={false} handleBtnClick={() => {}} />
      <section className="flex lg:flex-row flex-col gap-3">
        <div className="w-3/4"></div>
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
