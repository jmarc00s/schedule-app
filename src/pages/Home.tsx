import React from 'react';
import Card from '../components/Card';
import { useAxios } from '../hooks/useAxios';
import { ScheduleModel } from '../models/schedule.model';

const Home = () => {
  const [schedules, setSchedules] = React.useState<ScheduleModel[]>([]);
  const { request, loading } = useAxios<ScheduleModel[]>();

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
    <section className="flex flex-col">
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
    </section>
  );
};

export default Home;
