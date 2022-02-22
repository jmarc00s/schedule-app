import React, { useEffect } from 'react';
import FabButton from 'src/components/FabButton';
import { IconPlusSm } from 'src/components/icons/IconPlusSm';
import useAuth from 'src/core/hooks/useAuth';
import Card from '../components/Card';
import { useAxios } from '../core/hooks/useAxios';
import { ScheduleModel } from '../core/models/schedule.model';

const Home = () => {
  const [schedules, setSchedules] = React.useState<ScheduleModel[]>([]);
  const { request } = useAxios<ScheduleModel[]>();
  const { user } = useAuth();

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
      <Card title="Próximos horários">
        <ul>
          {schedules.map((schedule) => (
            <li key={schedule.id}>
              {schedule.client?.name} - {schedule.service?.description} - {schedule.date}{' '}
              - {schedule.time}
            </li>
          ))}
        </ul>
      </Card>
      <FabButton icon={IconPlusSm} onClick={() => console.log('clicked')} />
    </>
  );
};

export default Home;
