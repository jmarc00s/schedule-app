import React from 'react';
import Layout from 'src/components/template/Layout';
import useAuth from 'src/core/hooks/useAuth';
import Card from '../components/Card';
import { useAxios } from '../core/hooks/useAxios';
import { ScheduleModel } from '../core/models/schedule.model';

const Home = () => {
  const [schedules, setSchedules] = React.useState<ScheduleModel[]>([]);
  const { request } = useAxios<ScheduleModel[]>();
  const { user } = useAuth();

  React.useEffect(() => {
    async function getSchedules() {
      const response = await request({ url: '/schedules' });

      if (response) {
        setSchedules(response);
      }
    }

    getSchedules();
  }, []);

  return (
    <Layout>
      <h1>Bem vindo {user?.username}</h1>
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
    </Layout>
  );
};

export default Home;
