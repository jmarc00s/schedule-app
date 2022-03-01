import { createContext, ReactNode, useEffect, useState } from 'react';
import { useAxios } from 'src/core/hooks/useAxios';
import { ScheduleModel } from 'src/core/models/schedule.model';

interface SchedulesContextProps {
  schedules: ScheduleModel[];
  setSchedules: (schedules: ScheduleModel[]) => void;
  loading: boolean;
  fetchSchedules: (page?: number, limit?: number) => void;
}

const SchedulesContext = createContext<SchedulesContextProps>({
  schedules: [],
  setSchedules: () => {},
  loading: false,
  fetchSchedules: () => {},
});

interface SchedulesContextProviderProps {
  children: ReactNode;
}

export function SchedulesProvider({ children }: SchedulesContextProviderProps) {
  const [schedules, setSchedules] = useState<ScheduleModel[]>([]);
  const { request, loading } = useAxios<ScheduleModel[]>();

  async function fetchSchedules(page: number = 1, limit: number = 10) {
    const data = await request({
      url: `/schedules?_page=${page}&_limit=${limit}`,
      method: 'GET',
    });

    if (data) {
      setSchedules(data);
    }
  }

  useEffect(() => {
    fetchSchedules();
  }, []);

  return (
    <SchedulesContext.Provider
      value={{ schedules, fetchSchedules, loading, setSchedules }}
    >
      {children}
    </SchedulesContext.Provider>
  );
}

export default SchedulesContext;
