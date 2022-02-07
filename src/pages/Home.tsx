import React from 'react';
import Card from '../components/Card';
import Layout from '../components/template/Layout';
import { useAxios } from '../hooks/useAxios';
import { ScheduleModel } from '../models/schedule.model';

const Home = () => {
  const [schedules, setSchedules] = React.useState<ScheduleModel[]>([]);
  const { request } = useAxios<ScheduleModel[]>();

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
      <div>
        <Card title="Próximos horários">
          <ul>
            {schedules.map((schedule) => (
              <li key={schedule.id}>
                {schedule.client?.name} - {schedule.service?.description} -{' '}
                {schedule.date} - {schedule.time}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </Layout>
  );
};

export default Home;
