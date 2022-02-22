import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';

import { useAxios } from '../../core/hooks/useAxios';
import { ScheduleModel } from '../../core/models/schedule.model';
import SchedulesTable from './components/SchedulesTable';

const Schedules = () => {
  const [schedules, setSchedules] = React.useState<ScheduleModel[]>([]);
  const { request, loading } = useAxios<ScheduleModel[]>();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function getSchedules() {
      const data = await request({ url: '/schedules', method: 'GET' });

      if (data) {
        setSchedules(data);
      }
    }

    getSchedules();
  }, []);

  function handleAddScheduleClick() {
    navigate('/schedules/add');
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
    </section>
  );
};

export default Schedules;
