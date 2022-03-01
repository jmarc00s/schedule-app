import { createContext, ReactNode, useEffect, useState } from 'react';
import { useAxios } from 'src/core/hooks/useAxios';
import { ScheduleModel } from 'src/core/models/schedule.model';

interface SchedulesContextProps {
  schedules: ScheduleModel[];
  totalSchedules: number;
  setSchedules: (schedules: ScheduleModel[]) => void;
  loading: boolean;
  fetchSchedules: (page?: number, limit?: number) => void;
}

const SchedulesContext = createContext<SchedulesContextProps>({
  schedules: [],
  totalSchedules: 0,
  setSchedules: () => {},
  loading: false,
  fetchSchedules: () => {},
});

interface SchedulesContextProviderProps {
  children: ReactNode;
}

export function SchedulesProvider({ children }: SchedulesContextProviderProps) {
  const [schedules, setSchedules] = useState<ScheduleModel[]>([]);
  const { requestWithResponse, loading } = useAxios<ScheduleModel[]>();
  const [totalSchedules, setTotalSchedules] = useState(0);

  async function fetchSchedules(page: number = 1, limit: number = 10) {
    const response = await requestWithResponse({
      url: `/schedules?_page=${page}&_limit=${limit}`,
      method: 'GET',
    });

    if (response) {
      setSchedules(response.data);
      setTotalSchedules(Number(response.headers['x-total-count']));
    }
  }

  useEffect(() => {
    fetchSchedules();
  }, []);

  return (
    <SchedulesContext.Provider
      value={{ schedules, fetchSchedules, loading, setSchedules, totalSchedules }}
    >
      {children}
    </SchedulesContext.Provider>
  );
}

export default SchedulesContext;
