import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddScheduleDialog from 'src/components/AddScheduleDialog';
import PageHeader from '../../components/PageHeader';

import { useAxios } from '../../core/hooks/useAxios';
import { ScheduleModel } from '../../core/models/schedule.model';
import SchedulesTable from './components/SchedulesTable';

const Schedules = () => {
  const [openModal, setOpenModal] = useState(false);
  const [schedules, setSchedules] = useState<ScheduleModel[]>([]);
  const { request, loading } = useAxios<ScheduleModel[]>();
  const navigate = useNavigate();

  async function getSchedules() {
    const data = await request({ url: '/schedules', method: 'GET' });

    if (data) {
      setSchedules(data);
    }
  }

  useEffect(() => {
    getSchedules();
  }, []);

  function handleAddScheduleClick() {
    setOpenModal(true);
  }

  function handleScheduleDialogClose() {
    console.log('onclose');
    getSchedules();
  }

  return (
    <section>
      <PageHeader
        title="Horários"
        showProgress={loading}
        btnText="Adicionar horário"
        handleBtnClick={handleAddScheduleClick}
      />
      <div style={{ height: '60vh', overflow: 'auto' }}>
        {schedules.length ? (
          <SchedulesTable
            schedules={schedules}
            setSchedules={(schedules) => setSchedules(schedules)}
          />
        ) : (
          <p className="text-center mt-1">Não existem horários registrados.</p>
        )}
      </div>
      <AddScheduleDialog
        open={openModal}
        setOpen={setOpenModal}
        onClose={handleScheduleDialogClose}
      />
    </section>
  );
};

export default Schedules;
